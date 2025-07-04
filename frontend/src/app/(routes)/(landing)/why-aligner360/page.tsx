import Image from "next/image"
import Link from "next/link"

const WhyAligner360 = () => {
    const images = [
        "/images/aligner/p1.jpg",
        "/images/aligner/p2.jpg",
        "/images/aligner/p3.jpg",
        "/images/aligner/p4.jpg",
        "/images/aligner/p5.jpg",
        "/images/aligner/p6.jpg",
    ]

    const features = [
        {
            title: "Nearly Invisible",
            description: "Clear aligners that are virtually undetectable, allowing you to smile confidently throughout your treatment.",
            icon: "👁️"
        },
        {
            title: "Comfortable Fit",
            description: "Custom-made aligners that fit perfectly to your teeth for maximum comfort during daily wear.",
            icon: "😊"
        },
        {
            title: "Removable Design",
            description: "Easy to remove for eating, drinking, brushing, and flossing - maintaining your oral hygiene routine.",
            icon: "🔄"
        },
        {
            title: "Faster Results",
            description: "Advanced technology and precise planning deliver results faster than traditional braces.",
            icon: "⚡"
        },
        {
            title: "Professional Care",
            description: "Expert orthodontists monitor your progress every step of the way for optimal results.",
            icon: "👩‍⚕️"
        },
        {
            title: "Proven Technology",
            description: "FDA-approved clear aligner technology trusted by dental professionals worldwide.",
            icon: "✅"
        }
    ]

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
            {/* Hero Section */}
            <section className="max-w-7xl mx-auto pt-20 px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
                        WHY CHOOSE{" "}
                        <span className="gradient-text bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                            ALIGNER360
                        </span>{" "}
                        <br />
                        <span className="text-3xl sm:text-5xl lg:text-6xl">CLEAR ALIGNERS?</span>
                    </h1>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto mt-8 leading-relaxed">
                        Get the smile you've always wanted—perfectly aligned teeth with nearly invisible braces
                        that fit seamlessly into your lifestyle.
                    </p>
                </div>

                {/* Trust Badge */}
                <div className="bg-white rounded-2xl shadow-xl p-8 mb-20 border border-gray-100">
                    <div className="text-center">
                        <div className="flex justify-center items-center mb-6">
                            <div className="flex space-x-1">
                                {[...Array(5)].map((_, i) => (
                                    <span key={i} className="text-yellow-400 text-2xl">⭐</span>
                                ))}
                            </div>
                        </div>
                        <h2 className="text-2xl sm:text-4xl font-bold text-gray-900 mb-4">
                            Trusted by{" "}
                            <span className="text-blue-600">7 out of 10</span>{" "}
                            people
                        </h2>
                        <p className="text-lg text-gray-600">
                            for clear aligner treatment—choose Aligner360 for a confident smile.
                        </p>
                    </div>
                </div>

                {/* Features Section */}
                <div className="mb-20">
                    <h3 className="text-center text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                        What sets{" "}
                        <span className="gradient-text bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                            Aligner360
                        </span>{" "}
                        apart
                    </h3>
                    <p className="text-center text-lg text-gray-600 mb-16 max-w-2xl mx-auto">
                        Discover the advantages that make our clear aligners the preferred choice for your smile transformation.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {images.map((image, idx) => (
                            <div key={idx} className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300">
                                <Image
                                    src={image}
                                    width={400}
                                    height={300}
                                    alt={`Aligner360 Clear Aligners Result ${idx + 1}`}
                                    className="w-full  sm:object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            </div>
                        ))}
                    </div>
                </div>

            </section>
                {/* CTA Section */}
            <div className="bg-primary text-white py-12 mt-20">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <h3 className="text-3xl font-bold mb-4">Still in Doubt?</h3>
                    <p className="text-lg mb-8 opacity-90">
                        Contact our professional team for a free consultation
                    </p>
                    <Link href={'/contact'}>
                        <button className="bg-white text-primary font-semibold px-8 py-3 rounded-full hover:bg-primary-light transition-colors duration-300 shadow-lg">
                            Get Started Today
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default WhyAligner360