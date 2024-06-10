"use client"
import Image from "next/image";
import {useInView} from "react-intersection-observer";
import {fetchAnime} from "@/app/action";
import {JSX, useEffect, useState} from "react";

let page = 2;

export type AnimeCardType = JSX.Element | null;

function LoadMore() {
  const [ref, inView] = useInView();
    const [isLoading, setIsLoading] = useState<boolean>()
  const [data, setData] = useState<AnimeCardType[]>([]);

  useEffect(() => {
        if(inView){
            setIsLoading(true);
            const delay = 500;

            const timeoutId = setTimeout(() => {
                fetchAnime(page).then((res) => {
                    setData([...data, ...res]);
                    page++;
                });

                setIsLoading(false);
            }, delay);

            return () => clearTimeout(timeoutId);
        }
      }, [inView, data, isLoading])

  return (
      <>
          <section className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-4 gap-10">
              {data}
          </section>
          <section className="flex justify-center items-center w-full">
              <div ref={ref}>
                  {inView && isLoading &&
                          <Image
                          src="./spinner.svg"
                          alt="spinner"
                          width={56}
                          height={56}
                          className="object-contain"
                      />
                  }
              </div>
          </section>
      </>
  );
}

export default LoadMore;
