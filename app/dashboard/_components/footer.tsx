import Image from "next/image";

export const Footer = () => {
  return (
    <div className="w-full border-t">
      <footer className="bg-secondary/20 dark:bg-secondary mx-auto w-full max-w-7xl border-x">
        <div className="bg-card flex w-full flex-1 flex-row items-center justify-between rounded-xl p-5">
          <p className="text-muted-foreground text-sm">2026 copyright.</p>
          <a
            className="text-muted-foreground decoration-muted-foreground hover:decoration-foreground hover:text-foreground inline-flex items-center gap-1 font-medium transition-colors duration-200"
            href="https://abhishekz.vercel.app"
            target="_blank"
          >
            <Image
              src={"/abhishek.png"}
              width={100}
              height={100}
              alt="Abhishek's Pic"
              className="bg-muted mr-1 size-8 rounded-md outline-1"
            />
            Shipped with{" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              color="currentColor"
              className="size-5.5 fill-rose-500"
            >
              <path
                d="M10.4107 19.9677C7.58942 17.858 2 13.0348 2 8.69444C2 5.82563 4.10526 3.5 7 3.5C8.5 3.5 10 4 12 6C14 4 15.5 3.5 17 3.5C19.8947 3.5 22 5.82563 22 8.69444C22 13.0348 16.4106 17.858 13.5893 19.9677C12.6399 20.6776 11.3601 20.6776 10.4107 19.9677Z"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="0"
              ></path>
            </svg>{" "}
            by <span className="underline decoration-wavy">Abhishek </span>
          </a>
        </div>
      </footer>
    </div>
  );
};
