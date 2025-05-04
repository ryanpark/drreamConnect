import { Spinner } from "@/components/ui/spinner";
import Image from "next/image";

export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <>
      <div className="flex justify-center">
        <Spinner size="xlg" className="bg-yellow" />
      </div>
      <Image
        src="/rabbit.png"
        width={174}
        height={248}
        alt="Picture of the author"
      />
    </>
  );
}
