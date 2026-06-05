"use client";

import { useState } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import type { DoctorProfileResponse, SpecialtyResponse } from "@/interface/response";
import { GENDER, ROLE_NAME, SPECIALTY_TYPE, USER_STATUS } from "@/common";
import { mockDoctors } from "./mockData/doctors";
import { mockSpecialties } from "./mockData/specialties";

type FormDoctor = Omit<DoctorProfileResponse, "id"> & { id?: string };

export default function DoctorTable() {
  const [items, setItems] = useState<DoctorProfileResponse[]>(mockDoctors);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<DoctorProfileResponse | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const specialtyOptions: SpecialtyResponse[] = mockSpecialties;

  const emptyForm: FormDoctor = {
    id: undefined,
    user: {
      id: "",
      email: "",
      fullName: "",
      phone: "",
      role: ROLE_NAME.DOCTOR,
      gender: GENDER.MALE,
      dateOfBirth: "",
      status: USER_STATUS.ACTIVE,
      pathAvatar: "",
      emailVerified: false,
      phoneVerified: false,
      createdAt: "",
      updatedAt: null,
      deletedAt: null,
      deleted: false,
    },
    doctorCode: "",
    specialty: specialtyOptions[0],
    degree: "",
    experienceYears: 0,
    education: "",
    bio: "",
    consultationFee: 0,
    averageRating: 0,
    totalReviews: 0,
    totalPatients: 0,
    isFeatured: false,
    deleted: false,
    createdAt: "",
    updatedAt: null,
    deletedAt: null,
  };

  const [form, setForm] = useState<FormDoctor>(emptyForm);

  const openAdd = () => {
    setEditingItem(null);
    setForm(emptyForm);
    setDialogOpen(true);
  };

  const openEdit = (item: DoctorProfileResponse) => {
    setEditingItem(item);
    setForm({
      id: item.id,
      user: { ...item.user },
      doctorCode: item.doctorCode,
      specialty: item.specialty,
      degree: item.degree,
      experienceYears: item.experienceYears,
      education: item.education,
      bio: item.bio,
      consultationFee: item.consultationFee,
      averageRating: item.averageRating,
      totalReviews: item.totalReviews,
      totalPatients: item.totalPatients,
      isFeatured: item.isFeatured,
      deleted: item.deleted,
      createdAt: item.createdAt,
      updatedAt: item.updatedAt,
      deletedAt: item.deletedAt,
    });
    setDialogOpen(true);
  };

  const updateField = (field: string, value: unknown) => {
    if (field.startsWith("user.")) {
      const userField = field.replace("user.", "");
      setForm((prev) => ({
        ...prev,
        user: { ...prev.user, [userField]: value },
      }));
    } else {
      setForm((prev) => ({ ...prev, [field]: value }));
    }
  };

  const handleSubmit = () => {
    const payload: DoctorProfileResponse = {
      ...(form as DoctorProfileResponse),
      id: form.id || Date.now().toString(),
    };
    if (editingItem) {
      console.log("[Doctor] EDIT payload:", payload);
    } else {
      console.log("[Doctor] ADD payload:", payload);
    }
    if (editingItem) {
      setItems((prev) => prev.map((i) => (i.id === editingItem.id ? payload : i)));
    } else {
      setItems((prev) => [...prev, payload]);
    }
    setDialogOpen(false);
  };

  const handleDelete = (id: string) => {
    console.log("[Doctor] DELETE payload:", { id });
    setItems((prev) => prev.filter((i) => i.id !== id));
    setDeleteConfirm(null);
  };

  const formatPrice = (p: number) =>
    new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(p);

  const genderLabel = (g: GENDER) =>
    g === GENDER.MALE ? "Male" : g === GENDER.FEMALE ? "Female" : "Other";

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-heading font-medium">Doctors</h2>
        <Button onClick={openAdd} size="sm">
          <Plus className="size-4" />
          Add Doctor
        </Button>
      </div>

      <div className="rounded-xl border bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Doctor Code</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Specialty</TableHead>
              <TableHead>Degree</TableHead>
              <TableHead>Experience</TableHead>
              <TableHead>Fee</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right w-24">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-mono text-xs">{item.doctorCode}</TableCell>
                <TableCell className="font-medium">{item.user.fullName}</TableCell>
                <TableCell>{item.specialty.name}</TableCell>
                <TableCell>{item.degree}</TableCell>
                <TableCell>{item.experienceYears} yrs</TableCell>
                <TableCell>{formatPrice(item.consultationFee)}</TableCell>
                <TableCell>
                  <span
                    className={cn(
                      "inline-flex rounded-full px-2 py-0.5 text-xs font-medium",
                      item.user.status === USER_STATUS.ACTIVE
                        ? "bg-green-50 text-green-700"
                        : "bg-gray-100 text-gray-500"
                    )}
                  >
                    {item.user.status}
                  </span>
                </TableCell>
                <TableCell>
                  <div className="flex items-center justify-end gap-1">
                    <Button variant="ghost" size="icon-sm" onClick={() => openEdit(item)}>
                      <Pencil className="size-3.5" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      onClick={() => setDeleteConfirm(item.id)}
                    >
                      <Trash2 className="size-3.5 text-destructive" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
            {items.length === 0 && (
              <TableRow>
                <TableCell colSpan={8} className="h-24 text-center text-muted-foreground">
                  No doctors found. Click &quot;Add Doctor&quot; to create one.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingItem ? "Edit Doctor" : "Add Doctor"}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-3">
            <div className="grid grid-cols-2 gap-3">
              <div className="grid gap-1.5">
                <Label>Doctor Code</Label>
                <Input
                  value={form.doctorCode}
                  onChange={(e) => updateField("doctorCode", e.target.value)}
                  placeholder="e.g. BS-005"
                />
              </div>
              <div className="grid gap-1.5">
                <Label>Experience (years)</Label>
                <Input
                  type="number"
                  value={form.experienceYears}
                  onChange={(e) => updateField("experienceYears", Number(e.target.value))}
                />
              </div>
            </div>

            <p className="text-xs font-medium text-muted-foreground mt-1">Account Info</p>
            <div className="grid gap-1.5">
              <Label>Full Name</Label>
              <Input
                value={form.user.fullName}
                onChange={(e) => updateField("user.fullName", e.target.value)}
                placeholder="Doctor full name"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="grid gap-1.5">
                <Label>Email</Label>
                <Input
                  type="email"
                  value={form.user.email}
                  onChange={(e) => updateField("user.email", e.target.value)}
                  placeholder="email@example.com"
                />
              </div>
              <div className="grid gap-1.5">
                <Label>Phone</Label>
                <Input
                  value={form.user.phone}
                  onChange={(e) => updateField("user.phone", e.target.value)}
                  placeholder="090xxxxxxx"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="grid gap-1.5">
                <Label>Gender</Label>
                <Select
                  value={form.user.gender}
                  onValueChange={(val) => updateField("user.gender", val as GENDER)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {(Object.values(GENDER) as GENDER[]).map((g) => (
                      <SelectItem key={g} value={g}>
                        {genderLabel(g)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-1.5">
                <Label>Status</Label>
                <Select
                  value={form.user.status}
                  onValueChange={(val) => updateField("user.status", val as USER_STATUS)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {(Object.values(USER_STATUS) as USER_STATUS[]).map((s) => (
                      <SelectItem key={s} value={s}>
                        {s}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="grid gap-1.5">
                <Label>Date of Birth</Label>
                <Input
                  type="date"
                  value={form.user.dateOfBirth}
                  onChange={(e) => updateField("user.dateOfBirth", e.target.value)}
                />
              </div>
              <div className="grid gap-1.5">
                <Label>Avatar URL</Label>
                <Input
                  value={form.user.pathAvatar}
                  onChange={(e) => updateField("user.pathAvatar", e.target.value)}
                  placeholder="https://..."
                />
              </div>
            </div>

            <p className="text-xs font-medium text-muted-foreground mt-1">Professional Info</p>
            <div className="grid gap-1.5">
              <Label>Specialty</Label>
              <Select
                value={form.specialty.id}
                onValueChange={(val) =>
                  updateField(
                    "specialty",
                    specialtyOptions.find((s) => s.id === val) || specialtyOptions[0]
                  )
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {specialtyOptions.map((s) => (
                    <SelectItem key={s.id} value={s.id}>
                      {s.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="grid gap-1.5">
                <Label>Degree</Label>
                <Input
                  value={form.degree}
                  onChange={(e) => updateField("degree", e.target.value)}
                  placeholder="e.g. Tiến sĩ, Thạc sĩ"
                />
              </div>
              <div className="grid gap-1.5">
                <Label>Education</Label>
                <Input
                  value={form.education}
                  onChange={(e) => updateField("education", e.target.value)}
                  placeholder="University name"
                />
              </div>
            </div>
            <div className="grid gap-1.5">
              <Label>Bio</Label>
              <Input
                value={form.bio}
                onChange={(e) => updateField("bio", e.target.value)}
                placeholder="Short bio"
              />
            </div>
            <div className="grid gap-1.5">
              <Label>Consultation Fee (VND)</Label>
              <Input
                type="number"
                value={form.consultationFee}
                onChange={(e) => updateField("consultationFee", Number(e.target.value))}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="d-featured">Featured</Label>
              <Switch
                id="d-featured"
                checked={form.isFeatured}
                onCheckedChange={(checked) => updateField("isFeatured", checked)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSubmit}>{editingItem ? "Save" : "Create"}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={!!deleteConfirm} onOpenChange={(open) => !open && setDeleteConfirm(null)}>
        <DialogContent className="sm:max-w-sm" showCloseButton={false}>
          <DialogHeader>
            <DialogTitle>Delete Doctor</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-muted-foreground">
            Are you sure you want to delete this doctor? This action cannot be undone.
          </p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteConfirm(null)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() => deleteConfirm && handleDelete(deleteConfirm)}
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
