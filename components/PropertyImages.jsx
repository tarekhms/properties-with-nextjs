'use client';
import Image from "next/image";
import { Gallery, Item } from "react-photoswipe-gallery";

const ProperyImages = ({ images }) => {
    return (
        <Gallery>
            <section className="bg-blue-50 p-4">
                <div className="container mx-auto">

                    <div className="grid grid-cols-2 gap-4">
                        {images.map((image, index) => (
                            <div key={index} className={images.length % 2 != 0 && (index + 1) === images.length ? 'col-span-2' : 'col-span-1'}>
                                <Item
                                    original={image}
                                    thumbnail={image}
                                    width="1024"
                                    height="768"
                                >
                                    {({ ref, open }) => (
                                        <Image
                                            src={image}
                                            ref={ref}
                                            onClick={open}
                                            alt=''
                                            className='object-cover h-[400px] w-full rounded-xl cursor-pointer'
                                            width={1800}
                                            height={400}
                                            priority={true}
                                        />
                                    )}
                                </Item>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </Gallery>
    );
}

export default ProperyImages;