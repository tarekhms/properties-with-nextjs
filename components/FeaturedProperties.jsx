import connectDB from "@/config/db"
import Property from "@/models/Property"
import FeaturedPropertyCard from "./FeaturedPropertyCard";

const FeaturedProperties = async () => {
    await connectDB();

    const properties = await Property.find({
        is_featured: true
    }).lean();

    return properties.length > 0 && (
        <>
            <section className="featured-cards">
                <h2>
                    Featured Properties
                </h2>
                <div>
                    {properties.map((property) => (
                        <FeaturedPropertyCard key={property._id} property={property} />
                    ))}
                </div>
            </section>
        </>
    )
}

export default FeaturedProperties