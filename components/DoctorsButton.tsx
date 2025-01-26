import { Button } from "@/components/ui/button";
import { UserRound } from "lucide-react";
import Link from "next/link";

export function DoctorsButton() {
  return (
    <Link href="/doctors">
      <Button className="flex items-center gap-2">
        <UserRound className="w-4 h-4" />
        View Doctors
      </Button>
    </Link>
  );
} 