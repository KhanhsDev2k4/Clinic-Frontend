"use client";

import { useState } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Switch as SwitchPrimitive } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import type { ServiceResponse } from "@/interface/response";
import { mockServices } from "./mockData/services";

export default function ServiceTable() {
  const [items, setItems] = useState<ServiceResponse[]>(mockServices);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<ServiceResponse | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const emptyForm: Omit<ServiceResponse, "id"> = {
    name: "",
    slug: "",
    description: "",
    price: 0,
    promotionalPrice: 0,
    duration: 0,
    image: "",
    isFeatured: false,
    isActive: true,
    createdAt: "",
    updatedAt: null,
    deletedAt: null,
    deleted: false,
  };

  const [form, setForm] = useState(emptyForm);

  const openAdd = () => {
    setEditingItem(null);
    setForm(emptyForm);
    setDialogOpen(true);
  };

  const openEdit = (item: ServiceResponse) => {
    setEditingItem(item);
    setForm({
      name: item.name,
      slug: item.slug,
      description: item.description,
      price: item.price,
      promotionalPrice: item.promotionalPrice ?? 0,
      duration: item.duration,
      image: item.image,
      isFeatured: item.isFeatured,
      isActive: item.isActive,
      createdAt: item.createdAt,
      updatedAt: item.updatedAt,
      deletedAt: item.deletedAt,
      deleted: item.deleted,
    });
    setDialogOpen(true);
  };

  const handleSubmit = () => {
    const payload = editingItem ? { ...editingItem, ...form } : { ...form, id: Date.now().toString() };
    if (editingItem) {
      console.log("[Service] EDIT payload:", payload);
    } else {
      console.log("[Service] ADD payload:", payload);
    }
    if (editingItem) {
      setItems((prev) => prev.map((i) => (i.id === editingItem.id ? payload : i)));
    } else {
      setItems((prev) => [...prev, payload]);
    }
    setDialogOpen(false);
  };

  const handleDelete = (id: string) => {
    console.log("[Service] DELETE payload:", { id });
    setItems((prev) => prev.filter((i) => i.id !== id));
    setDeleteConfirm(null);
  };

  const formatPrice = (p: number) =>
    new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(p);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-heading font-medium">Services</h2>
        <Button onClick={openAdd} size="sm">
          <Plus className="size-4" />
          Add Service
        </Button>
      </div>

      <div className="rounded-xl border bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Slug</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Promo Price</TableHead>
              <TableHead>Duration (min)</TableHead>
              <TableHead>Active</TableHead>
              <TableHead className="text-right w-24">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">{item.name}</TableCell>
                <TableCell className="text-muted-foreground">{item.slug}</TableCell>
                <TableCell>{formatPrice(item.price)}</TableCell>
                <TableCell>
                  {item.promotionalPrice ? formatPrice(item.promotionalPrice) : "—"}
                </TableCell>
                <TableCell>{item.duration}</TableCell>
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
                <TableCell colSpan={7} className="h-24 text-center text-muted-foreground">
                  No services found. Click &quot;Add Service&quot; to create one.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{editingItem ? "Edit Service" : "Add Service"}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-3">
            <div className="grid gap-1.5">
              <Label htmlFor="s-name">Name</Label>
              <Input
                id="s-name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Service name"
              />
            </div>
            <div className="grid gap-1.5">
              <Label htmlFor="s-slug">Slug</Label>
              <Input
                id="s-slug"
                value={form.slug}
                onChange={(e) => setForm({ ...form, slug: e.target.value })}
                placeholder="e.g. cardiac-consultation"
              />
            </div>
            <div className="grid gap-1.5">
              <Label htmlFor="s-desc">Description</Label>
              <Input
                id="s-desc"
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                placeholder="Description"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="grid gap-1.5">
                <Label htmlFor="s-price">Price (VND)</Label>
                <Input
                  id="s-price"
                  type="number"
                  value={form.price}
                  onChange={(e) => setForm({ ...form, price: Number(e.target.value) })}
                />
              </div>
              <div className="grid gap-1.5">
                <Label htmlFor="s-promo">Promotional Price</Label>
                <Input
                  id="s-promo"
                  type="number"
                  value={form.promotionalPrice}
                  onChange={(e) =>
                    setForm({ ...form, promotionalPrice: Number(e.target.value) })
                  }
                />
              </div>
            </div>
            <div className="grid gap-1.5">
              <Label htmlFor="s-duration">Duration (minutes)</Label>
              <Input
                id="s-duration"
                type="number"
                value={form.duration}
                onChange={(e) => setForm({ ...form, duration: Number(e.target.value) })}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="s-featured">Featured</Label>
              <Switch
                id="s-featured"
                checked={form.isFeatured}
                onCheckedChange={(checked) => setForm({ ...form, isFeatured: checked })}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="s-active">Active</Label>
              <Switch
                id="s-active"
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
            <DialogTitle>Delete Service</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-muted-foreground">
            Are you sure you want to delete this service? This action cannot be undone.
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
