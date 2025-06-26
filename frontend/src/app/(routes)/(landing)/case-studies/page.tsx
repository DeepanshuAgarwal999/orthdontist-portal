'use client'

import { Slider } from "@/components/slider"
import axiosInstance from "@/config/axios.instance"
import { useQuery } from "@tanstack/react-query"

type CaseStudy = {
    id: string,
    name: string,
    age: number,
    gender: "M" | "F",
    upper: string,
    lower: string,
    case: string,
    imageAfter: string,
    imageBefore: string,
}

const CaseStudiesPage = () => {
    const { data: caseStudies, isLoading, error } = useQuery({
        queryKey: ['case-studies'],
        queryFn: async () => {
            const response = await axiosInstance.get<{ data: CaseStudy[] }>('/case-studies')
            return response.data
        }
    })
    const CaseStudiesData = caseStudies?.data || []
    if (isLoading) {
        return (<div className="flex items-center justify-center min-h-screen bg-gray-50">
            <div className="text-center">
                <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
                <p className="mt-4 text-lg text-gray-600">Loading...</p>
                <p className="mt-2 text-sm text-gray-500">Fetching case studies...</p>
            </div>
        </div>)
    }
    if (CaseStudiesData.length === 0) {
        return <div className="flex justify-center py-20 min-h-screen bg-gray-50">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">Case Studies</h1>
                <p className="text-lg text-gray-600">Real patient transformations through dental spacing treatment</p>
                <h1 className="text-lg font-medium mt-16">No case studies found.</h1>
            </div>
        </div>

    }
    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">Case Studies</h1>
                    <p className="text-lg text-gray-600">Real patient transformations through dental spacing treatment</p>
                </div>

                <div className="flex flex-col gap-14">
                    {CaseStudiesData.map((caseStudy, index) => (
                        <div key={index} className=" overflow-hidden border border-gray-100">
                            <div className="flex flex-col lg:flex-row justify-between">
                                {/* Patient Information Section */}
                                <div className={`lg:w-1/4 p-8 bg-gradient-to-br from-blue-50 to-indigo-50 ${index % 2 === 0 ? 'order-1' : 'order-2'}`}>
                                    <div className="space-y-6">
                                        <div className="text-center lg:text-left">
                                            <h2 className="text-2xl font-bold text-blue-900 mb-2">
                                                {caseStudy.name}
                                            </h2>
                                            <p className="text-blue-700 text-lg mb-6">{caseStudy.case}</p>
                                        </div>

                                        <div className="space-y-4">
                                            <div className="flex items-center justify-between bg-white/70 rounded-lg p-3">
                                                <span className="text-gray-600 font-medium">Age:</span>
                                                <span className="text-gray-900 font-semibold">
                                                    {caseStudy.age}/{caseStudy.gender}
                                                </span>
                                            </div>

                                            <div className="flex items-center justify-between bg-white/70 rounded-lg p-3">
                                                <span className="text-gray-600 font-medium">Upper:</span>
                                                <span className="text-gray-900 font-semibold">
                                                    {caseStudy.upper}
                                                </span>
                                            </div>

                                            <div className="flex items-center justify-between bg-white/70 rounded-lg p-3">
                                                <span className="text-gray-600 font-medium">Lower:</span>
                                                <span className="text-gray-900 font-semibold">
                                                    {caseStudy.lower}
                                                </span>
                                            </div>
                                        </div>

                                    </div>
                                </div>

                                {/* Before/After Images Section */}
                                <div className={`lg:w-3/4  ${index % 2 === 0 ? 'order-2' : 'order-1'}`}>
                                    <div className={`h-full flex items-center  ${index % 2 === 0 ? 'justify-end' : 'justify-start'}`}>
                                        <div className="w-full max-w-2xl">
                                            <div className=" overflow-hidden shadow-xl">
                                                <Slider
                                                    image1={caseStudy.imageAfter}
                                                    image2={caseStudy.imageBefore}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default CaseStudiesPage