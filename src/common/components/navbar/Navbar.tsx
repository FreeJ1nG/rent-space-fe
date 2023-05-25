import { useRouter } from "next/router";
import Image from "next/image";
import { PATH_RENT_SPACE } from "@/common/routes/path";
import AuthMenu from "@/common/components/navbar/AuthMenu";

function Navbar() {
  const router = useRouter();

  return (
    <div className="fixed left-0 right-0 w-full h-20 px-3 sm:px-8 bg-blue-500 flex justify-between items-center">
      <div className="flex">
        <button onClick={() => router.push(PATH_RENT_SPACE.root)}>
          <div className="w-16 h-16 relative">
            <Image src="/logo.png" alt="logo" fill />
          </div>
        </button>
      </div>
      <AuthMenu />
    </div>
  );
}

export default Navbar;
