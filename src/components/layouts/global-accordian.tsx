import { GlobalAccordianProps } from '@/interfaces/common-interfaces'
import Link from 'next/link'
import React from 'react'

const GlobalAccordian = ({ data }: GlobalAccordianProps) => {

    return (
        <div>
            <div className="bg-white flex flex-col gap-7 rounded-lg shadow-sm p-8 lg:p-12">
                {/* Title */}
                <div className="text-center mb-7">
                    <h2 className="text-3xl md:text-4xl font-bold text-heading">
                        {data.title}
                    </h2>
                </div>

                {/* Privacy Policy Sections */}
                <div className="space-y-12">
                    {data.sections.map((section, index) => (
                        <section key={section.id} id={section.id} className="scroll-mt-8">
                            <h3 className="text-xl md:text-2xl font-semibold text-primary mb-5">
                                {index + 1}. {section.title}
                            </h3>
                            <div className="space-y-2">
                                {section.content.map((paragraph, paragraphIndex) => (
                                    <p
                                        key={paragraphIndex}
                                        className="text-gray-700 leading-relaxed"
                                    >
                                        {paragraph.includes("📧") ? (
                                            <>
                                                {paragraph.split("📧")[0]}
                                                {paragraph.includes("📧") && (
                                                    <>
                                                        <Link
                                                            href={`mailto:${paragraph.split("📧")[1].trim()}`}
                                                            className="text-primary hover:text-primary-hover underline"
                                                        >
                                                            {paragraph.split("📧")[1].trim()}
                                                        </Link>
                                                    </>
                                                )}
                                            </>
                                        ) : (
                                            paragraph
                                        )}
                                    </p>
                                ))}
                            </div>
                        </section>
                    ))}
                </div>

                {/* Contact Information */}
                <div className="border-t pt-8 mt-8">
                    <div className="bg-gray-50 p-6 rounded-lg">
                        <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-6">
                            Contact Information
                        </h3>
                        <div className="space-y-3 text-gray-700">
                            <p>
                                <strong>Company:</strong> {data.companyName}
                            </p>
                            <p className="flex items-center gap-2">
                                <strong>Email:</strong>
                                <Link
                                    href={`mailto:${data.contactEmail}`}
                                    className="text-primary hover:text-primary-hover underline"
                                >
                                    {data.contactEmail}
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default GlobalAccordian