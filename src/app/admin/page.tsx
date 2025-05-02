"use client";

import { useRouter } from "next/navigation";

export default function AdminHome() {
    const router = useRouter();
    router.push("/admin/articles");
    return null;
}