import { Document, Page, Text, View, StyleSheet, Font } from "@react-pdf/renderer";
import {
  INVOICE_ITEM_TYPE_LABELS,
  INVOICE_STATUS_CONFIG,
} from "@/components/InvoiceManagement/config";
import { InvoiceResponse } from "@/interface/response";

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  page: {
    fontFamily: "Helvetica",
    fontSize: 9,
    paddingTop: 36,
    paddingBottom: 48,
    paddingHorizontal: 40,
    color: "#1a1a1a",
  },
  // Header
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 28,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
  },
  clinicName: {
    fontSize: 16,
    fontFamily: "Helvetica-Bold",
    color: "#111827",
  },
  clinicSub: {
    fontSize: 8,
    color: "#9ca3af",
    marginTop: 2,
  },
  invoiceMeta: {
    alignItems: "flex-end",
  },
  invoiceCode: {
    fontSize: 12,
    fontFamily: "Helvetica-Bold",
    color: "#111827",
  },
  invoiceDate: {
    fontSize: 8,
    color: "#6b7280",
    marginTop: 3,
  },
  statusBadge: {
    marginTop: 6,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 20,
    backgroundColor: "#f3f4f6",
  },
  statusText: {
    fontSize: 8,
    fontFamily: "Helvetica-Bold",
    color: "#374151",
  },
  // Patient section
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 8,
    fontFamily: "Helvetica-Bold",
    color: "#9ca3af",
    textTransform: "uppercase",
    letterSpacing: 0.8,
    marginBottom: 6,
  },
  patientName: {
    fontSize: 11,
    fontFamily: "Helvetica-Bold",
    color: "#111827",
  },
  patientPhone: {
    fontSize: 8,
    color: "#6b7280",
    marginTop: 2,
  },
  // Table
  table: {
    marginBottom: 20,
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#f9fafb",
    paddingVertical: 6,
    paddingHorizontal: 8,
    borderTopWidth: 1,
    borderTopColor: "#e5e7eb",
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
  },
  tableRow: {
    flexDirection: "row",
    paddingVertical: 7,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#f3f4f6",
  },
  colType: { width: "20%" },
  colDesc: { flex: 1 },
  colQty: { width: "8%", textAlign: "right" },
  colUnit: { width: "18%", textAlign: "right" },
  colTotal: { width: "18%", textAlign: "right" },
  headerText: {
    fontSize: 8,
    fontFamily: "Helvetica-Bold",
    color: "#6b7280",
  },
  cellText: {
    fontSize: 8.5,
    color: "#374151",
  },
  cellBold: {
    fontSize: 8.5,
    fontFamily: "Helvetica-Bold",
    color: "#111827",
  },
  // Summary
  summaryContainer: {
    alignSelf: "flex-end",
    width: 200,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 3,
  },
  summaryLabel: {
    fontSize: 8.5,
    color: "#6b7280",
  },
  summaryValue: {
    fontSize: 8.5,
    color: "#374151",
  },
  divider: {
    borderTopWidth: 1,
    borderTopColor: "#e5e7eb",
    marginVertical: 4,
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 4,
  },
  totalLabel: {
    fontSize: 10,
    fontFamily: "Helvetica-Bold",
    color: "#111827",
  },
  totalValue: {
    fontSize: 10,
    fontFamily: "Helvetica-Bold",
    color: "#111827",
  },
  balanceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 5,
    paddingHorizontal: 8,
    borderRadius: 4,
    marginTop: 4,
  },
  footer: {
    position: "absolute",
    bottom: 24,
    left: 40,
    right: 40,
    borderTopWidth: 1,
    borderTopColor: "#f3f4f6",
    paddingTop: 8,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  footerText: {
    fontSize: 7.5,
    color: "#9ca3af",
  },
});

// ─── Helpers ──────────────────────────────────────────────────────────────────

const fmt = (n: number) =>
  new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(n);

// ─── Component ────────────────────────────────────────────────────────────────

interface InvoicePdfDocumentProps {
  invoice: InvoiceResponse;
  clinicName?: string;
}

export function InvoicePdfDocument({
  invoice,
  clinicName = "Camel Clinic",
}: InvoicePdfDocumentProps) {
  const isPaid = invoice.status === "PAID";

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* ── Header ── */}
        <View style={styles.header}>
          <View>
            <Text style={styles.clinicName}>{clinicName}</Text>
            <Text style={styles.clinicSub}>Medical Invoice</Text>
          </View>
          <View style={styles.invoiceMeta}>
            <Text style={styles.invoiceCode}>{invoice.invoiceCode}</Text>
            <Text style={styles.invoiceDate}>{invoice.invoiceDate}</Text>
            <View style={styles.statusBadge}>
              <Text style={styles.statusText}>{invoice.status}</Text>
            </View>
          </View>
        </View>

        {/* ── Patient info ── */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Bill To</Text>
          <Text style={styles.patientName}>{invoice.patientProfile.fullName}</Text>
          {invoice.patientProfile.phone && (
            <Text style={styles.patientPhone}>{invoice.patientProfile.phone}</Text>
          )}
          {invoice.appointment && (
            <Text style={styles.patientPhone}>
              Appointment: {invoice.appointment.appointmentCode ?? `#${invoice.appointment.id}`}
            </Text>
          )}
        </View>

        {/* ── Items table ── */}
        <View style={styles.table}>
          <Text style={styles.sectionTitle}>Services & Items</Text>

          <View style={styles.tableHeader}>
            <Text style={[styles.headerText, styles.colType]}>Type</Text>
            <Text style={[styles.headerText, styles.colDesc]}>Description</Text>
            <Text style={[styles.headerText, styles.colQty]}>Qty</Text>
            <Text style={[styles.headerText, styles.colUnit]}>Unit Price</Text>
            <Text style={[styles.headerText, styles.colTotal]}>Total</Text>
          </View>

          {invoice.items.map((item, i) => (
            <View key={i} style={styles.tableRow}>
              <Text style={[styles.cellText, styles.colType]}>
                {INVOICE_ITEM_TYPE_LABELS[item.itemType]}
              </Text>
              <Text style={[styles.cellText, styles.colDesc]}>{item.itemName}</Text>
              <Text style={[styles.cellText, styles.colQty]}>{item.quantity}</Text>
              <Text style={[styles.cellText, styles.colUnit]}>{fmt(item.unitPrice)}</Text>
              <Text style={[styles.cellBold, styles.colTotal]}>{fmt(item.totalPrice)}</Text>
            </View>
          ))}
        </View>

        {/* ── Summary ── */}
        <View style={styles.summaryContainer}>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Subtotal</Text>
            <Text style={styles.summaryValue}>{fmt(invoice.subtotal)}</Text>
          </View>

          {invoice.discountAmount > 0 && (
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Discount</Text>
              <Text style={[styles.summaryValue, { color: "#059669" }]}>
                − {fmt(invoice.discountAmount)}
              </Text>
            </View>
          )}

          <View style={styles.divider} />

          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalValue}>{fmt(invoice.totalAmount)}</Text>
          </View>

          {invoice.insuranceCovered > 0 && (
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Insurance covered</Text>
              <Text style={[styles.summaryValue, { color: "#2563eb" }]}>
                − {fmt(invoice.insuranceCovered)}
              </Text>
            </View>
          )}

          {invoice.patientPaid > 0 && (
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Patient paid</Text>
              <Text style={styles.summaryValue}>− {fmt(invoice.patientPaid)}</Text>
            </View>
          )}

          <View style={styles.divider} />

          <View
            style={[
              styles.balanceRow,
              {
                backgroundColor: invoice.balance <= 0 ? "#ecfdf5" : "#fef2f2",
              },
            ]}
          >
            <Text
              style={[styles.totalLabel, { color: invoice.balance <= 0 ? "#065f46" : "#991b1b" }]}
            >
              Balance due
            </Text>
            <Text
              style={[styles.totalValue, { color: invoice.balance <= 0 ? "#065f46" : "#991b1b" }]}
            >
              {fmt(invoice.balance)}
            </Text>
          </View>
        </View>

        {/* ── Footer ── */}
        <View style={styles.footer} fixed>
          <Text style={styles.footerText}>{clinicName} · Medical Invoice</Text>
          <Text style={styles.footerText}>Generated {new Date().toLocaleDateString("vi-VN")}</Text>
        </View>
      </Page>
    </Document>
  );
}
