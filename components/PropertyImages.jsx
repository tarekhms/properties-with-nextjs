import Image from "next/image";

const ProperyImages = ({ images }) => {
    return (
        <section className="bg-blue-50 p-4">
            <div className="container mx-auto">

                <div className="grid grid-cols-2 gap-4">
                    {images.map((image, index) => (
                        <div key={index} className={images.length % 2 != 0 && (index + 1) === images.length ? 'col-span-2' : 'col-span-1'}>
                            <Image
                                src={image}
                                alt=''
                                className='object-cover h-[400px] w-full rounded-xl'
                                width={1800}
                                height={400}
                                priority={true}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default ProperyImages;