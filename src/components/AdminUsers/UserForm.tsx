"use client";

import { Formik } from "formik";
import { Info, Loader2, Save } from "lucide-react";

import { ROLE_NAME, USER_STATUS, GENDER } from "@/common";
import { userFormSchema } from "./config";
import { useUsers } from "./hooks";
import { UserItem } from "@/interface/response";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { formatDateToApi } from "@/lib/utils";

interface UserFormProps {
  data?: UserItem;
}

interface UserFormValue {
  fullName: string;
  email: string;
  phone: string;
  password: string;
  dateOfBirth: string;
  gender: string;
  role: string;
  status: string;
}

const UserForm = ({ data }: UserFormProps) => {
  const { createUser, updateUser } = useUsers();

  const isEditMode = Boolean(data?.id);

  const initialValues: UserFormValue = {
    fullName: data?.fullName ?? "",
    email: data?.email ?? "",
    phone: data?.phone ?? "",
    password: "",
    dateOfBirth: "",
    gender: data?.gender ?? GENDER.MALE,
    role: data?.role ?? ROLE_NAME.PATIENT,
    status: data?.status ?? USER_STATUS.ACTIVE,
  };

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-6 sm:px-6 lg:py-10">
      <Formik<UserFormValue>
        initialValues={initialValues}
        validationSchema={userFormSchema}
        enableReinitialize
        onSubmit={async (values, { setSubmitting }) => {
          try {
            const payload = {
              name: values.fullName.trim(),
              email: values.email.trim().toLowerCase(),
              phone: values.phone.trim(),
              dateOfBirth: formatDateToApi(values.dateOfBirth),
              gender: values.gender,
              role: values.role,
              status: values.status,
            };

            if (data?.id) {
              await updateUser.trigger({
                ...payload,
                id: data.id,
              });
            } else {
              await createUser.trigger(payload);
            }
          } catch (error) {
            console.error(isEditMode ? "Error updating user:" : "Error creating user:", error);
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({
          values,
          errors,
          touched,
          isSubmitting,
          handleChange,
          handleBlur,
          handleSubmit,
          setFieldValue,
        }) => (
          <form onSubmit={handleSubmit}>
            <Card className="overflow-hidden shadow-sm">
              <CardHeader className="border-b bg-muted/30">
                <CardTitle className="text-2xl">
                  {isEditMode ? "Cập nhật người dùng" : "Tạo người dùng"}
                </CardTitle>

                <CardDescription>
                  {isEditMode
                    ? "Chỉnh sửa thông tin và quyền của người dùng."
                    : "Nhập thông tin để tạo tài khoản người dùng mới."}
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-6 p-6">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  {/* Full name */}
                  <FormField
                    label="Họ và tên"
                    name="fullName"
                    error={
                      touched.fullName && errors.fullName ? String(errors.fullName) : undefined
                    }
                  >
                    <Input
                      id="fullName"
                      name="fullName"
                      type="text"
                      placeholder="Nhập họ và tên"
                      value={values.fullName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      aria-invalid={touched.fullName && Boolean(errors.fullName)}
                    />
                  </FormField>

                  {/* Email */}
                  <FormField
                    label="Email"
                    name="email"
                    error={touched.email && errors.email ? String(errors.email) : undefined}
                  >
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="example@gmail.com"
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      aria-invalid={touched.email && Boolean(errors.email)}
                    />
                  </FormField>

                  {/* Phone */}
                  <FormField
                    label="Số điện thoại"
                    name="phone"
                    error={touched.phone && errors.phone ? String(errors.phone) : undefined}
                  >
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      inputMode="numeric"
                      placeholder="Ví dụ: 0353127609"
                      value={values.phone}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      aria-invalid={touched.phone && Boolean(errors.phone)}
                    />
                  </FormField>

                  {/* Date of birth */}
                  <FormField
                    label="Ngày sinh"
                    name="dateOfBirth"
                    error={
                      touched.dateOfBirth && errors.dateOfBirth
                        ? String(errors.dateOfBirth)
                        : undefined
                    }
                  >
                    <Input
                      id="dateOfBirth"
                      name="dateOfBirth"
                      type="date"
                      value={values.dateOfBirth}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      aria-invalid={touched.dateOfBirth && Boolean(errors.dateOfBirth)}
                    />
                  </FormField>

                  {/* Gender */}
                  <FormField
                    label="Giới tính"
                    name="gender"
                    error={touched.gender && errors.gender ? String(errors.gender) : undefined}
                  >
                    <Select
                      value={values.gender}
                      onValueChange={(value) => {
                        setFieldValue("gender", value);
                      }}
                    >
                      <SelectTrigger
                        id="gender"
                        aria-invalid={touched.gender && Boolean(errors.gender)}
                        className="w-full"
                      >
                        <SelectValue placeholder="Chọn giới tính" />
                      </SelectTrigger>

                      <SelectContent>
                        <SelectItem value={GENDER.MALE}>Nam</SelectItem>
                        <SelectItem value={GENDER.FEMALE}>Nữ</SelectItem>
                        <SelectItem value={GENDER.OTHER}>Khác</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormField>

                  {/* Role */}
                  <FormField
                    label="Vai trò"
                    name="role"
                    error={touched.role && errors.role ? String(errors.role) : undefined}
                  >
                    <Select
                      value={values.role}
                      onValueChange={(value) => {
                        setFieldValue("role", value);
                      }}
                    >
                      <SelectTrigger
                        className="w-full"
                        id="role"
                        aria-invalid={touched.role && Boolean(errors.role)}
                      >
                        <SelectValue placeholder="Chọn vai trò" />
                      </SelectTrigger>

                      <SelectContent>
                        <SelectItem value={ROLE_NAME.ADMIN}>Admin</SelectItem>

                        <SelectItem value={ROLE_NAME.DOCTOR}>Doctor</SelectItem>

                        <SelectItem value={ROLE_NAME.PATIENT}>Patient</SelectItem>

                        <SelectItem value={ROLE_NAME.STAFF}>Staff</SelectItem>

                        <SelectItem value={ROLE_NAME.GUEST}>Guest</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormField>

                  {/* Status */}
                  <FormField
                    label="Trạng thái"
                    name="status"
                    error={touched.status && errors.status ? String(errors.status) : undefined}
                  >
                    <Select
                      value={values.status}
                      onValueChange={(value) => {
                        setFieldValue("status", value);
                      }}
                    >
                      <SelectTrigger
                        className="w-full"
                        id="status"
                        aria-invalid={touched.status && Boolean(errors.status)}
                      >
                        <SelectValue placeholder="Chọn trạng thái" />
                      </SelectTrigger>

                      <SelectContent>
                        <SelectItem value={USER_STATUS.ACTIVE}>Hoạt động</SelectItem>

                        <SelectItem value={USER_STATUS.INACTIVE}>Không hoạt động</SelectItem>

                        <SelectItem value={USER_STATUS.BANNED}>Đã khóa</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormField>
                </div>

                <div className="flex justify-end border-t pt-6">
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Đang lưu...
                      </>
                    ) : (
                      <>
                        <Save className="mr-2 h-4 w-4" />
                        {isEditMode ? "Cập nhật" : "Tạo người dùng"}
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </form>
        )}
      </Formik>
    </div>
  );
};

interface FormFieldProps {
  label: string;
  name: string;
  error?: string;
  children: React.ReactNode;
}

const FormField = ({ label, name, error, children }: FormFieldProps) => {
  return (
    <div className="space-y-2">
      <Label htmlFor={name}>{label}</Label>

      {children}

      {error && <p className="text-sm font-medium text-destructive">{error}</p>}
    </div>
  );
};

export default UserForm;
