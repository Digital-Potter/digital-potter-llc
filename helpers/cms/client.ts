const baseUrl = () => {
	const v = process.env.NEXT_PUBLIC_CMS;
	if (!v) throw new Error('NEXT_PUBLIC_CMS env var not set');
	return v.replace(/\/$/, '');
};

const tenant = () => {
	const v = process.env.NEXT_PUBLIC_CMS_TENANT;
	if (!v) throw new Error('NEXT_PUBLIC_CMS_TENANT env var not set');
	return v;
};

type FetchOpts = {
	revalidate?: number | false;
	tags?: string[];
};

export async function apiGet<T = unknown>(
	path: string,
	opts: FetchOpts = {},
): Promise<T> {
	const res = await fetch(`${baseUrl()}${path}`, {
		headers: { 'x-tenant-id': tenant() },
		next:
			opts.revalidate === false
				? { revalidate: 0, tags: opts.tags }
				: { revalidate: opts.revalidate ?? 60, tags: opts.tags },
	});
	if (!res.ok) {
		const text = await res.text();
		throw new Error(`CMS GET ${path} → ${res.status}: ${text}`);
	}
	return res.json() as Promise<T>;
}

export async function apiPost<T = unknown>(
	path: string,
	body: unknown,
): Promise<T> {
	const res = await fetch(`${baseUrl()}${path}`, {
		method: 'POST',
		headers: {
			'x-tenant-id': tenant(),
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(body),
		cache: 'no-store',
	});
	if (!res.ok) {
		const text = await res.text();
		throw new Error(`CMS POST ${path} → ${res.status}: ${text}`);
	}
	return res.json() as Promise<T>;
}
