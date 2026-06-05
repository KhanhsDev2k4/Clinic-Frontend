"use client";

import { useState } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import type { SpecialtyResponse } from "@/interface/response";
import { SPECIALTY_TYPE } from "@/common";
import { mockSpecialties } from "./mockData/specialties";
import { cn } from "@/lib/utils";

export default function SpecialtyTable() {
  const [items, setItems] = useState<SpecialtyResponse[]>(mockSpecialties);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<SpecialtyResponse | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const emptyForm: Omit<SpecialtyResponse, "id"> = {
    name: "",
    slug: "",
    description: "",
    image: "",
    displayOrder: 0,
    specialtyType: SPECIALTY_TYPE.GENERAL,
    isActive: true,
  };

  const [form, setForm] = useState(emptyForm);

  const openAdd = () => {
    setEditingItem(null);
    setForm(emptyForm);
    setDialogOpen(true);
  };

  const openEdit = (item: SpecialtyResponse) => {
    setEditingItem(item);
    setForm({
      name: item.name,
      slug: item.slug,
      description: item.description,
      image: item.image,
      displayOrder: item.displayOrder,
      specialtyType: item.specialtyType,
      isActive: item.isActive,
    });
    setDialogOpen(true);
  };

  const handleSubmit = () => {
    if (editingItem) {
      const updated: SpecialtyResponse = { ...editingItem, ...form };
      console.log("[Specialty] EDIT payload:", updated);
      setItems((prev) => prev.map((i) => (i.id === editingItem.id ? updated : i)));
    } else {
      const created: SpecialtyResponse = { ...form, id: Date.now().toString() };
      console.log("[Specialty] ADD payload:", created);
      setItems((prev) => [...prev, created]);
    }
    setDialogOpen(false);
  };

  const handleDelete = (id: string) => {
    console.log("[Specialty] DELETE payload:", { id });
    setItems((prev) => prev.filter((i) => i.id !== id));
    setDeleteConfirm(null);
  };

  const specialtyTypeLabel = (t: SPECIALTY_TYPE) => {
    const map: Record<string, string> = {
      GENERAL: "General",
      SURGERY: "Surgery",
      PEDIATRICS: "Pediatrics",
      DERMATOLOGY: "Dermatology",
      CARDIOLOGY: "Cardiology",
      ORTHOPEDICS: "Orthopedics",
      NEUROLOGY: "Neurology",
      PSYCHIATRY: "Psychiatry",
      GYNECOLOGY: "Gynecology",
      ENDOCRINOLOGY: "Endocrinology",
    };
    return map[t] || t;
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-heading font-medium">Specialties</h2>
        <Button onClick={openAdd} size="sm" data-slot="button" data-variant="default">
          <Plus className="size-4" />
          Add Specialty
        </Button>
      </div>

      <div className="rounded-xl border bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Slug</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Order</TableHead>
              <TableHead>Active</TableHead>
              <TableHead className="text-right w-24">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">{item.name}</TableCell>
                <TableCell className="text-muted-foreground">{item.slug}</TableCell>
                <TableCell>{specialtyTypeLabel(item.specialtyType)}</TableCell>
                <TableCell>{item.displayOrder}</TableCell>
                <TableCell>
                  <span
                    className={cn(
                      "inline-flex rounded-full px-2 py-0.5 text-xs font-medium",
                      item.isActive
                        ? "bg-green-50 text-green-700"
                        : "bg-gray-100 text-gray-500"
                    )}
                  >
                    {item.isActive ? "Active" : "Inactive"}
                  </span>
                </TableCell>
                <TableCell>
                  <div className="flex items-center justify-end gap-1">
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      onClick={() => openEdit(item)}
                    >
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
                <TableCell colSpan={6} className="h-24 text-center text-muted-foreground">
                  No specialties found. Click &quot;Add Specialty&quot; to create one.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{editingItem ? "Edit Specialty" : "Add Specialty"}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-3">
            <div className="grid gap-1.5">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Specialty name"
              />
            </div>
            <div className="grid gap-1.5">
              <Label htmlFor="slug">Slug</Label>
              <Input
                id="slug"
                value={form.slug}
                onChange={(e) => setForm({ ...form, slug: e.target.value })}
                placeholder="e.g. cardiology"
              />
            </div>
            <div className="grid gap-1.5">
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                placeholder="Description"
              />
            </div>
            <div className="grid gap-1.5">
              <Label htmlFor="displayOrder">Display Order</Label>
              <Input
                id="displayOrder"
                type="number"
                value={form.displayOrder}
                onChange={(e) => setForm({ ...form, displayOrder: Number(e.target.value) })}
              />
            </div>
            <div className="grid gap-1.5">
              <Label>Type</Label>
              <Select
                value={form.specialtyType}
                onValueChange={(val) => setForm({ ...form, specialtyType: val as SPECIALTY_TYPE })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  {(Object.values(SPECIALTY_TYPE) as SPECIALTY_TYPE[]).map((t) => (
                    <SelectItem key={t} value={t}>
                      {specialtyTypeLabel(t)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="isActive">Active</Label>
              <Switch
                id="isActive"
                checked={form.isActive}
                onCheckedChange={(checked) => setForm({ ...form, isActive: checked })}
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
            <DialogTitle>Delete Specialty</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-muted-foreground">
            Are you sure you want to delete this specialty? This action cannot be undone.
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
