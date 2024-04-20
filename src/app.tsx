import { LucideLink } from "lucide-react";
import { Input } from "./components/ui/input";
import { Skeleton } from "./components/ui/skeleton";
import { GithubIcon } from "./assets/icons/github-icon";
import { LinkedinIcon } from "./assets/icons/linkedin-icon";
import QRCode from "react-qr-code";
import QRCodeLink from "qrcode";
import { ChangeEvent, useState } from "react";
import { DownloadButton } from "./components/download-button";

export function App() {
  const [link, setLink] = useState("");
  const [qrcodelink, setQrcodelink] = useState("");

  function handleDownload(link_url: string) {
    QRCodeLink.toDataURL(
      link_url,
      {
        width: 600,
        margin: 3,
      },
      function (_err: any, url: string) {
        setQrcodelink(url);
      }
    );
  }

  function handleQrcode(e: ChangeEvent<HTMLInputElement>) {
    setLink(e.target.value);
    handleDownload(e.target.value);
  }

  return (
    <div className="flex justify-center items-center w-screen h-screen">
      <div className="flex flex-col w-screen h-screen lg:flex lg:flex-row flex-shrink lg:w-auto lg:h-auto">
        <div className="bg-slate-100 w-screen h-screen rounded-l-none lg:w-[44em] lg:h-[40em] lg:rounded-l-xl p-6">
          <div className="flex flex-col gap-10 md:gap-16">
            <h1 className="font-bold text-2xl w-3/4 md:text-6xl md:w-3/4">
              Gere seu QRCode rapidamente usando um link ou texto!
            </h1>
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <LucideLink />
                <Input
                  className="bg-gray-300 w-2/3"
                  type="url"
                  value={link}
                  onChange={(e) => handleQrcode(e)}
                  placeholder={"Digite algum link ou texto..."}
                />
              </div>

              <div className="flex">
                <a href="https://github.com/feapolina/">
                  <GithubIcon className="size-10 md:size-12" />
                </a>
                <a href="https://www.linkedin.com/in/felipe-cavalcanti-39a88a253/">
                  <LinkedinIcon className="size-10 md:size-12" />
                </a>
              </div>
            </div>
          </div>
          <div className="mt-4">
            <span className="text-gray-400">
              Made with ❤ by Felipe Cavalcanti
            </span>
          </div>
        </div>

        <div className="bg-red-600 w-screen h-screen rounded-r-none p-5 lg:w-96 lg:h-[40em] lg:rounded-r-xl flex flex-col gap-4 justify-center items-center">
          {link === "" ? (
            <>
              <Skeleton className="w-48 h-48 md:w-60 md:h-60" />
              <Skeleton className="w-14 h-14" />
            </>
          ) : (
            <>
              <QRCode
                bgColor="transparent"
                fgColor="#fff"
                size={231}
                value={link}
              />
              <a href={qrcodelink} download={`qrcode.png`}>
                <DownloadButton />
              </a>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
