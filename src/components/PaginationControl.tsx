"use client";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/solid";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

const PaginationControl = (props: PaginationControl) => {
    const { hasNextPage, hasPrevPage, dataLength } = props;
    const router = useRouter();
    const pathName = usePathname();
    const searchParams = useSearchParams();
    const page = searchParams.get("page") ?? "1";
    const per_page = searchParams.get("per_page") ?? "8";
    return (
        <div className="flex gap-5 justify-center items-center py-5">
            <button
                className="group"
                disabled={!hasPrevPage}
                onClick={() => {
                    router.push(
                        `${pathName}?page=${
                            Number(page) - 1
                        }&per_page=${per_page}`
                    );
                }}
            >
                <ArrowLeftIcon className="h-8 w-8 text-lanh_green group-disabled:text-gray-500 group-disabled:opacity-40" />
            </button>
            <div className=" text-xl">
                {page} / {Math.ceil(dataLength / Number(per_page))}
            </div>
            <button
                className="group"
                disabled={!hasNextPage}
                onClick={() => {
                    router.push(
                        `${pathName}?page=${
                            Number(page) + 1
                        }&per_page=${per_page}`
                    );
                }}
            >
                <ArrowRightIcon className="h-8 w-8 text-lanh_green group-disabled:text-gray-500 group-disabled:opacity-40" />
            </button>
        </div>
    );
};

export default PaginationControl;
