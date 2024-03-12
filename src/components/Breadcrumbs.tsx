import Link from "next/link";
import { ChevronRightIcon } from "@heroicons/react/24/solid";
interface BreadCrumbs {
    name: string;
    path: string;
}

interface Props {
    breadcrumbs: BreadCrumbs[];
}


function BreadCrumbs(props: Props) {
    const { breadcrumbs } = props;
    return (
        <section className="md:py-7 py-5 text-lanh_green">
            <ul className="flex gap-2 flex-wrap">
                {breadcrumbs.map((item, index) => (
                    <li className="flex items-center gap-2" key={item.name}>
                        <Link href={item.path}>{item.name}</Link>
                        {breadcrumbs?.length - 1 !== index && (
                            <ChevronRightIcon className=" text-lanh_green h-4 w-4" />
                        )}
                    </li>
                ))}
            </ul>
        </section>
    );
}

export default BreadCrumbs;
