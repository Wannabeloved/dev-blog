"use client";

import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from "@/components/ui/pagination";
import { Input } from "@/components/ui/input";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useCallback, useEffect, useState, useRef } from "react";
import { useUser } from "@/adapters/store/hooks/useUser";
import { getPosts } from "@/core/2.application/use-cases/mongo/get-posts";
import PostsList from "@/components/posts-list";
import HomeWidgets from "@/components/home-widgets";

export default function Home() {
	const { user } = useUser();
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();
	const timeoutRef = useRef<NodeJS.Timeout | null>(null);
	const [isLoading, setIsLoading] = useState(false);
	const [data, setData] = useState<{ posts: any[]; lastPage: number }>({
		posts: [],
		lastPage: 0,
	});

	const page = Number(searchParams.get("page")) || 1;
	const search = searchParams.get("search") || "";

	const createQueryString = useCallback(
		(name: string, value: string) => {
			const params = new URLSearchParams(searchParams.toString());
			params.set(name, value);
			return params.toString();
		},
		[searchParams],
	);

	const handleSearch = useCallback(
		(value: string) => {
			const params = new URLSearchParams(searchParams.toString());
			params.set("search", value);
			params.set("page", "1"); // Сбрасываем страницу при новом поиске
			router.push(`${pathname}?${params.toString()}`);
		},
		[pathname, router, searchParams],
	);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (timeoutRef.current) {
			clearTimeout(timeoutRef.current);
		}
		timeoutRef.current = setTimeout(() => {
			handleSearch(e.target.value);
		}, 500);
	};

	// Очищаем таймер при размонтировании
	useEffect(() => {
		return () => {
			if (timeoutRef.current) {
				clearTimeout(timeoutRef.current);
			}
		};
	}, []);

	useEffect(() => {
		const fetchPosts = async () => {
			setIsLoading(true);
			try {
				const response = await getPosts(page, search);
				setData({ posts: response.posts, lastPage: response.lastPage });
			} catch (error) {
				console.error("Failed to fetch posts:", error);
			} finally {
				setIsLoading(false);
			}
		};

		fetchPosts();
	}, [page, search]);

	const renderPagination = () => {
		const items = [];
		for (let i = 1; i <= data.lastPage; i++) {
			if (i === 1 || i === data.lastPage || (i >= page - 2 && i <= page + 2)) {
				items.push(
					<PaginationItem key={i}>
						<PaginationLink
							href={`${pathname}?${createQueryString("page", i.toString())}`}
							isActive={page === i}
						>
							{i}
						</PaginationLink>
					</PaginationItem>,
				);
			} else if (i === page - 3 || i === page + 3) {
				items.push(
					<PaginationItem key={i}>
						<PaginationEllipsis />
					</PaginationItem>,
				);
			}
		}
		return items;
	};

	return (
		<main className="w-full">
			<HomeWidgets />
			{user ? (
				<>
					<div className="max-w-xl mx-auto mb-6">
						<Input
							type="search"
							placeholder="Поиск постов..."
							defaultValue={search}
							onChange={handleInputChange}
							className="w-full"
						/>
					</div>

					{isLoading ? (
						<div className="text-center">Загрузка...</div>
					) : (
						<>
							<PostsList posts={data.posts} />
							{data.lastPage > 1 && (
								<Pagination>
									<PaginationContent>
										{page > 1 && (
											<PaginationItem>
												<PaginationPrevious
													href={`${pathname}?${createQueryString(
														"page",
														(page - 1).toString(),
													)}`}
												/>
											</PaginationItem>
										)}
										{renderPagination()}
										{page < data.lastPage && (
											<PaginationItem>
												<PaginationNext
													href={`${pathname}?${createQueryString(
														"page",
														(page + 1).toString(),
													)}`}
												/>
											</PaginationItem>
										)}
									</PaginationContent>
								</Pagination>
							)}
						</>
					)}
				</>
			) : (
				<div className="w-full text-center">
					You must be signed in to see posts
				</div>
			)}
		</main>
	);
}
