import Image from "next/image";
import Link from "next/link";
import { Palmtree } from "lucide-react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      {/* Visual side */}
      <div className="relative hidden lg:block">
        <Image
          src="https://images.unsplash.com/photo-1566296314736-6eaac1ca0cb9?auto=format&fit=crop&w=1400&q=80"
          alt="Sri Lanka"
          fill
          sizes="50vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a1a17]/90 to-primary/40" />
        <div className="absolute inset-0 flex flex-col justify-between p-12 text-white">
          <Link href="/" className="flex items-center gap-2">
            <span className="grid h-10 w-10 place-items-center rounded-full bg-white/15 backdrop-blur">
              <Palmtree className="h-5 w-5" />
            </span>
            <span className="font-heading text-xl font-semibold">Ceylon Trip Planners</span>
          </Link>
          <div>
            <h2 className="font-heading text-4xl font-semibold leading-tight">
              Your Sri Lankan adventure starts here.
            </h2>
            <p className="mt-3 max-w-md text-white/80">
              Sign in to manage your bookings, save favourite tours and plan your
              perfect trip.
            </p>
          </div>
        </div>
      </div>

      {/* Form side */}
      <div className="flex items-center justify-center bg-surface px-5 py-12">
        <div className="w-full max-w-md">
          <Link
            href="/"
            className="mb-8 flex items-center justify-center gap-2 lg:hidden"
          >
            <span className="grid h-10 w-10 place-items-center rounded-full bg-primary text-white">
              <Palmtree className="h-5 w-5" />
            </span>
            <span className="font-heading text-xl font-semibold">Ceylon Trip Planners</span>
          </Link>
          {children}
        </div>
      </div>
    </div>
  );
}
