"use client";

import { useState, useEffect } from "react";

interface User {
    _id: string;
    name: string;
    email: string;
    createdAt: string;
}

export function useUser() {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("/api/auth/me")
            .then((res) => res.ok ? res.json() : null)
            .then((data) => {
                if (data?.user) setUser(data.user);
            })
            .catch(() => { })
            .finally(() => setLoading(false));
    }, []);

    // Returns initials from name e.g. "Dr. Mohit Singh" -> "MS"
    const initials = user?.name
        ? user.name
            .split(" ")
            .filter((w) => !w.toLowerCase().startsWith("dr"))
            .map((w) => w[0]?.toUpperCase())
            .join("")
            .slice(0, 2) || user.name.slice(0, 2).toUpperCase()
        : "??";

    return { user, loading, initials };
}
