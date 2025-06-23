'use client'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Play, Clock, Users, Award, CheckCircle, Star } from 'lucide-react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { CourseService } from '@/service/course.service'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

const features = [
    {
        icon: <Users className="w-8 h-8 text-primary-600" />,
        title: "DESIGNED BY MDS ORTHODONTISTS",
        description: "Treatment planning for ALIGNER360 Aligners is done by qualified MDS Orthodontists only.",
        image: "/api/placeholder/300/200"
    },
    {
        icon: <Clock className="w-8 h-8 text-primary-600" />,
        title: "BEST TURN AROUND TIME",
        description: "ALIGNER360 Aligners provide treatment plans in less than 5 days & aligners in 10 days compared to others who take at least 30 to 45 days.",
        image: "/api/placeholder/300/200"
    },
    {
        icon: <Award className="w-8 h-8 text-primary-600" />,
        title: "AFFORDABLE & RELIABLE",
        description: "ALIGNER360 Aligners have very transparent pricing with affordable packages.",
        image: "/api/placeholder/300/200"
    }
]

const experts = [
    {
        name: "Dr. Priyanka Shingore",
        title: "Dental Director",
        image: "/api/placeholder/200/200",
        description: "Dr. Priyanka graduated in 2008, obtained her BDS degree from the faculty of dentistry at the Maharashtra University of Health Sciences. Upon graduating, she was selected to complete a multi-disciplinary hospital residency at Government Dental College and Hospital, Mumbai."
    },
    {
        name: "Dr. Zita Antao",
        title: "Dental Director for Learning and Development",
        image: "/api/placeholder/200/200",
        description: "Skilled in Endodontics, Implantology, Healthcare, and Surgery, a confident communicator who can relate well to dental patients. A proven ability to ensure that dental practices in surgery are continuously updated to provide first-rate care to patients and their families."
    },
    {
        name: "Dr. Manan Dhulia",
        title: "Dental Director",
        image: "/api/placeholder/200/200",
        description: "Dr. Manan Dhulia is a clinical operations expert with a rich experience in business advancement and teamwork, as well as a passion for implantology."
    }
]
const AcademyPage = () => {
    const router = useRouter()
    const queryClient = useQueryClient()
    const { data, isLoading: fetchingCourses } = useQuery({
        queryKey: ['courses'],
        queryFn: () => CourseService.getCourses(),
    })
    const courses = data?.data?.filter((vid) => !!vid.videoUrl)
    const { data: myEnrollmentsData, isLoading: fetchingMyEnrollments } = useQuery({
        queryKey: ['my-enrollments'],
        queryFn: () => CourseService.getMyEnrollments(),
    })
    const enrollMutation = useMutation({
        mutationFn: ({ id, slug }: { id: string, slug: string }) => CourseService.enrollInCourse(id),
        onSuccess: (data) => {
            toast.success('Successfully enrolled in course!');
            queryClient.invalidateQueries({ queryKey: ['courses'] });
            queryClient.invalidateQueries({ queryKey: ['my-enrollments'] });
            router.push(`/courses/${data.id}`)
        },
        onError: (error: any, variables) => {
            if (error.response?.status === 409) {
                router.push(`/courses/${variables.slug}`)
            }
            else {
                toast.error(error.response?.data?.message || 'Failed to enroll in course');
            }
        },
    });
    return (
        <div className="min-h-screen bg-gradient-to-b from-neutral-50 to-white">
            {/* Hero Section */}
            <section className="relative overflow-hidden bg-gradient-to-r from-primary-600 to-primary-800 text-white">
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="relative max-w-7xl mx-auto px-4 py-20 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h1 className="text-4xl sm:text-5xl !text-white lg:text-6xl font-bold mb-6">
                            ALIGNER360 Academy
                        </h1>
                        <p className="text-xl sm:text-2xl !text-gray-500 mb-8 text-primary-100 max-w-3xl mx-auto">
                            Advanced Training for Clear Aligner Excellence
                        </p>
                        <Button size="xl" variant="accent" className="shadow-2xl bg-[#ff712f]">
                            Start Learning Today
                        </Button>
                    </div>
                </div>
            </section>

            {/* Why Choose ALIGNER360 Section */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 mb-4">
                            Why Choose ALIGNER360 For Your Patients?
                        </h2>
                        <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
                            Discover the advantages that make ALIGNER360 the preferred choice for dental professionals worldwide
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {features.map((feature, index) => (
                            <Card key={index} className="group hover:shadow-2xl transition-all duration-300 border-0 shadow-lg">
                                <CardHeader className="text-center pb-4">
                                    <div className="mx-auto mb-4 p-3 bg-primary-50 rounded-full w-fit group-hover:bg-primary-100 transition-colors">
                                        {feature.icon}
                                    </div>
                                    <CardTitle className="text-xl font-bold text-neutral-900 mb-2">
                                        {feature.title}
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="text-center">
                                    <div className="mb-4 overflow-hidden rounded-lg">
                                        <img
                                            src={feature.image}
                                            alt={feature.title}
                                            className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
                                        />
                                    </div>
                                    <p className="text-neutral-600 leading-relaxed">
                                        {feature.description}
                                    </p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Video Course Section */}
            <section className="py-20 bg-gradient-to-b from-neutral-50 to-neutral-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 mb-4">
                            Video Course
                        </h2>
                        <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
                            Comprehensive training modules designed by experts to enhance your clear aligner practice
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {courses?.map((course, index) => (
                            <Card key={index} className="group hover:shadow-2xl transition-all duration-300 overflow-hidden border-0 shadow-lg">
                                <div className="relative overflow-hidden h-48">
                                    <div className=''>
                                        <video muted className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 ' >
                                            <source src={course.videoUrl} type="video/mp4" />
                                            <source src={course.videoUrl} type="video/webm" />
                                            <source src={course.videoUrl} type="video/ogg" />
                                            Your browser does not support the video tag.
                                        </video>
                                    </div>
                                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <Button size="lg" variant="accent" className="shadow-2xl" onClick={() => router.push(`/courses/${course.slug}`)}>
                                            <Play className="w-5 h-5 mr-2" />
                                            Watch Now
                                        </Button>
                                    </div>
                                    <Badge className="absolute top-3 left-3 bg-accent text-white">
                                        {course.price}
                                    </Badge>
                                </div>

                                <CardHeader className="pb-3">
                                    <CardTitle className="text-lg font-bold text-neutral-900 line-clamp-2">
                                        {course.title}
                                    </CardTitle>
                                </CardHeader>

                                <CardContent className="pt-0">
                                    <p className="text-neutral-600 text-sm leading-relaxed line-clamp-3 mb-4">
                                        {course.description}
                                    </p>
                                    <Button className="w-full" variant="outline" onClick={() => enrollMutation.mutate({ id: course.id, slug: course.slug })}>
                                        Enroll Now
                                    </Button>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    <div className="text-center mt-12">
                        <Button size="lg" variant="gradient" className="shadow-2xl">
                            View All Courses
                        </Button>
                    </div>
                </div>
            </section>            {/* Our Experts Section */}
            <section className="py-24 bg-white relative overflow-hidden">
                {/* Background decoration */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-white to-secondary-50"></div>
                <div className="absolute top-0 left-0 w-full h-full opacity-5">
                    <svg className="w-full h-full" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                            <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                                <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.5" />
                            </pattern>
                        </defs>
                        <rect width="100" height="100" fill="url(#grid)" />
                    </svg>
                </div>

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-20">
                        <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary-100 text-primary-800 text-sm font-medium mb-6">
                            <Star className="w-4 h-4 mr-2" />
                            Meet Our Team
                        </div>
                        <h2 className="text-4xl sm:text-5xl font-bold text-neutral-900 mb-6">
                            Our <span className="text-primary-600">Experts</span>
                        </h2>
                        <p className="text-xl text-neutral-600 max-w-3xl mx-auto leading-relaxed">
                            Learn from industry-leading professionals with years of experience in clear aligner therapy and dental excellence
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
                        {experts.map((expert, index) => (
                            <div key={index} className="group">
                                <Card className="bg-white border-0 shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden group-hover:-translate-y-2">
                                    <CardHeader className="text-center pb-6 pt-8">
                                        {/* Profile Image with enhanced styling */}
                                        <div className="relative mx-auto mb-6">
                                            <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-white shadow-2xl group-hover:shadow-3xl transition-all duration-300">
                                                <img
                                                    src={expert.image}
                                                    alt={expert.name}
                                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                                />
                                            </div>
                                            {/* Decorative ring */}
                                            <div className="absolute inset-0 w-40 h-40 rounded-full border-2 border-primary-200 group-hover:border-primary-400 transition-colors duration-300 animate-pulse"></div>
                                            {/* Status indicator */}
                                        </div>

                                        <CardTitle className="text-2xl font-bold text-neutral-900 mb-2 group-hover:text-primary-700 transition-colors">
                                            {expert.name}
                                        </CardTitle>
                                        <CardDescription className="text-primary-600 font-semibold text-lg mb-4">
                                            {expert.title}
                                        </CardDescription>
                                    </CardHeader>

                                    <CardContent className="px-6 pb-8">
                                        <p className="text-neutral-600 leading-relaxed text-center mb-6">
                                            {expert.description}
                                        </p>

                                    </CardContent>
                                </Card>
                            </div>
                        ))}
                    </div>


                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-gradient-to-b from-accent-50 to-white">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 mb-6">
                        Ready to Transform Your Practice?
                    </h2>
                    <p className="text-xl text-neutral-600 mb-8 max-w-2xl mx-auto">
                        Join thousands of dental professionals who have elevated their clear aligner expertise with ALIGNER360 Academy
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button size="xl" variant="gradient" className="shadow-2xl">
                            Start Your Journey
                        </Button>
                        <Button size="xl" variant="outline" className="border-2">
                            Contact Our Experts
                        </Button>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default AcademyPage