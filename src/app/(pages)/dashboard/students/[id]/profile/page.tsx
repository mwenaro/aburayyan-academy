export const revalidate = 0;
import { Breadcrumbs } from "@/components/breadcrumbs";
import PageContainer from "@/components/layout/page-container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { getData } from "@/libs/get-data";
import { strCapitalize } from "@/libs/str_functions";
import { IStudent } from "@/models/Student";
import { IClass } from "@/models/Class";
import { IUser } from "@/models/User";
import { Calendar, Mail, MapPin, Phone, User, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

interface StudentProfilePageProps {
  params: {
    id: string;
  };
}

export default async function StudentProfilePage({ params }: StudentProfilePageProps) {
  // Fetch student data
  const student: IStudent = await getData(`/v1/student/${params.id}`,{}, true);
  // console.log("Student Data:", student);
  // If student not found, show 404 page
  // This is a fallback for when the student data is not available
  
  if (!student) {
    notFound();
  }

  const breadcrumbItems = [
    { title: "Dashboard", link: "/dashboard" },
    { title: "Students", link: "/dashboard/students" },
    { title: student.name, link: `/dashboard/students/${params.id}/profile` },
  ];

  // Calculate age from date of birth
  const calculateAge = (dob: Date) => {
    const today = new Date();
    const birthDate = new Date(dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    
    return age;
  };

  return (
    <PageContainer>
      <div className="space-y-6">
        <Breadcrumbs items={breadcrumbItems} />
        
        {/* Header Section */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{strCapitalize(student.name)}</h1>
            <p className="text-muted-foreground">Student Profile</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" asChild>
              <Link href={`/dashboard/students/${params.id}/edit`}>
                Edit Profile
              </Link>
            </Button>
            <Button asChild>
              <Link href="/dashboard/students">
                Back to Students
              </Link>
            </Button>
          </div>
        </div>

        <Separator />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Profile Card */}
          <Card className="md:col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Profile
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-center">
                <Image
                  src={
                    student.photo ||
                    `/school/avatars/${student.gen.toLowerCase()}-student-avatar.png`
                  }
                  alt={`${student.name}'s photo`}
                  width={120}
                  height={120}
                  className="rounded-full object-cover border-4 border-border"
                />
              </div>
              
              <div className="text-center space-y-2">
                <h3 className="font-semibold text-lg">{strCapitalize(student.name)}</h3>
                <Badge variant="secondary" className="capitalize">
                  {student.gen}
                </Badge>
                <p className="text-sm text-muted-foreground">
                  Registration: {student.regno}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Details Cards */}
          <div className="md:col-span-2 space-y-6">
            {/* Personal Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Personal Information
                </CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">Full Name</label>
                  <p className="font-medium">{strCapitalize(student.name)}</p>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">Gender</label>
                  <p className="font-medium capitalize">{student.gen}</p>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">Date of Birth</label>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <p className="font-medium">
                      {new Date(student.dob).toLocaleDateString()} 
                      <span className="text-muted-foreground ml-2">
                        (Age: {calculateAge(student.dob)} years)
                      </span>
                    </p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">Registration Number</label>
                  <p className="font-medium font-mono">{student.regno}</p>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">Class/Grade</label>
                  <p className="font-medium">
                    {strCapitalize((student.class as unknown as IClass)?.name || 'Not Assigned')}
                  </p>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">Nationality</label>
                  <p className="font-medium capitalize">{student.address.nationality}</p>
                </div>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Phone className="h-5 w-5" />
                  Contact Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground">Phone Number</label>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <p className="font-medium">{student.contactDetails.phone}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Address Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Address Information
                </CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">Street</label>
                  <p className="font-medium">{student.address.street || 'Not provided'}</p>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">Town</label>
                  <p className="font-medium">{strCapitalize(student.address.town)}</p>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">County</label>
                  <p className="font-medium">{strCapitalize(student.address.county)}</p>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">Nationality</label>
                  <p className="font-medium capitalize">{student.address.nationality}</p>
                </div>
              </CardContent>
            </Card>

            {/* Additional Documents */}
            {(student.kas || student.birthCertificate) && (
              <Card>
                <CardHeader>
                  <CardTitle>Documents</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {student.kas && (
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-muted-foreground">KAS Certificate</label>
                      <p className="font-medium">{student.kas}</p>
                    </div>
                  )}
                  
                  {student.birthCertificate && (
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-muted-foreground">Birth Certificate</label>
                      <p className="font-medium">{student.birthCertificate}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Guardians Information */}
            {student.guardians && student.guardians.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Guardians ({student.guardians.length})
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {student.guardians.map((guardian, index) => (
                      <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center">
                            <User className="h-5 w-5" />
                          </div>
                          <div>
                            <p className="font-medium">Guardian {index + 1}</p>
                            <p className="text-sm text-muted-foreground">
                              {typeof guardian === 'string' ? guardian : (guardian as unknown as IUser)?.name || 'Name not available'}
                            </p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm" asChild>
                          <Link href={`/dashboard/guardians/${typeof guardian === 'string' ? guardian : (guardian as unknown as IUser)?._id}`}>
                            View Details
                          </Link>
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Timestamps */}
            <Card>
              <CardHeader>
                <CardTitle>Record Information</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">Created At</label>
                  <p className="font-medium">
                    {new Date(student.createdAt || '').toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">Last Updated</label>
                  <p className="font-medium">
                    {new Date(student.updatedAt || '').toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
