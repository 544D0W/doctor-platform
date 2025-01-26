'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Star, Mail, Phone } from "lucide-react";
import type { Doctor } from "@/types";
import { useDoctors } from '@/context/DoctorContext';

const getAvailabilityColor = (status: Doctor['availability']) => {
  switch (status) {
    case 'Available':
      return 'bg-green-100 text-green-800';
    case 'Busy':
      return 'bg-yellow-100 text-yellow-800';
    case 'Off-duty':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

export default function DoctorsTable() {
  const { doctors } = useDoctors();

  return (
    <div className="p-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Doctor</TableHead>
            <TableHead>Specialization</TableHead>
            <TableHead>Experience</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Rating</TableHead>
            <TableHead>Patients</TableHead>
            <TableHead>Contact</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {doctors.map((doctor) => (
            <TableRow key={doctor.id} className="hover:bg-gray-50">
              <TableCell className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={doctor.imageUrl} />
                  <AvatarFallback>{doctor.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium">{doctor.name}</div>
                  <div className="text-sm text-gray-500">{doctor.type}</div>
                </div>
              </TableCell>
              <TableCell>{doctor.specialization}</TableCell>
              <TableCell>{doctor.experience}</TableCell>
              <TableCell>
                <Badge className={getAvailabilityColor(doctor.availability)}>
                  {doctor.availability}
                </Badge>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span>{doctor.rating}</span>
                </div>
              </TableCell>
              <TableCell>{doctor.patientsHandled}</TableCell>
              <TableCell>
                <div className="flex flex-col gap-1">
                  <a href={`mailto:${doctor.email}`} className="flex items-center gap-1 text-sm text-gray-600 hover:text-primary">
                    <Mail className="w-4 h-4" />
                    {doctor.email}
                  </a>
                  <a href={`tel:${doctor.contact}`} className="flex items-center gap-1 text-sm text-gray-600 hover:text-primary">
                    <Phone className="w-4 h-4" />
                    {doctor.contact}
                  </a>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
} 