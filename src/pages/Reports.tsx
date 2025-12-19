import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { 
  Search, 
  Filter, 
  Download,
  Shield,
  Phone,
  Eye,
  Network,
  ChevronDown,
  CheckCircle,
  AlertTriangle,
  XCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type ScanType = "app" | "call" | "profile" | "network";
type Status = "safe" | "warning" | "danger";

interface ScanRecord {
  id: string;
  type: ScanType;
  name: string;
  status: Status;
  score: number;
  timestamp: string;
  details: string;
}

const scanRecords: ScanRecord[] = [
  { id: "1", type: "app", name: "WhatsApp", status: "safe", score: 95, timestamp: "2024-01-15 10:30", details: "No threats detected" },
  { id: "2", type: "call", name: "+91 98765 43210", status: "danger", score: 15, timestamp: "2024-01-15 09:45", details: "Known scam number" },
  { id: "3", type: "profile", name: "john_doe_official", status: "warning", score: 62, timestamp: "2024-01-15 08:20", details: "Suspicious activity patterns" },
  { id: "4", type: "network", name: "Home WiFi", status: "safe", score: 88, timestamp: "2024-01-14 22:00", details: "Minor vulnerabilities found" },
  { id: "5", type: "app", name: "Unknown APK", status: "danger", score: 12, timestamp: "2024-01-14 18:30", details: "Malware signature detected" },
  { id: "6", type: "call", name: "+91 87654 32109", status: "safe", score: 92, timestamp: "2024-01-14 15:15", details: "Verified business number" },
  { id: "7", type: "profile", name: "crypto_investor_real", status: "danger", score: 8, timestamp: "2024-01-14 12:00", details: "AI-generated profile detected" },
  { id: "8", type: "app", name: "Instagram", status: "safe", score: 94, timestamp: "2024-01-14 10:45", details: "All permissions verified" },
  { id: "9", type: "network", name: "Coffee Shop WiFi", status: "warning", score: 55, timestamp: "2024-01-13 16:30", details: "Unsecured network" },
  { id: "10", type: "call", name: "+91 76543 21098", status: "warning", score: 48, timestamp: "2024-01-13 14:20", details: "Potential spam caller" },
];

const typeIcons: Record<ScanType, React.ElementType> = {
  app: Shield,
  call: Phone,
  profile: Eye,
  network: Network,
};

const typeLabels: Record<ScanType, string> = {
  app: "App Scan",
  call: "Call Analysis",
  profile: "Profile Check",
  network: "Network Scan",
};

const statusStyles: Record<Status, { bg: string; text: string; icon: React.ElementType }> = {
  safe: { bg: "bg-success/10", text: "text-success", icon: CheckCircle },
  warning: { bg: "bg-warning/10", text: "text-warning", icon: AlertTriangle },
  danger: { bg: "bg-destructive/10", text: "text-destructive", icon: XCircle },
};

const Reports = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState<ScanType | "all">("all");
  const [filterStatus, setFilterStatus] = useState<Status | "all">("all");

  const filteredRecords = scanRecords.filter(record => {
    const matchesSearch = record.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         record.details.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = filterType === "all" || record.type === filterType;
    const matchesStatus = filterStatus === "all" || record.status === filterStatus;
    return matchesSearch && matchesType && matchesStatus;
  });

  const stats = {
    total: scanRecords.length,
    safe: scanRecords.filter(r => r.status === "safe").length,
    warning: scanRecords.filter(r => r.status === "warning").length,
    danger: scanRecords.filter(r => r.status === "danger").length,
  };

  return (
    <>
      <Helmet>
        <title>Scan Reports - CyberSuraksha AI</title>
        <meta name="description" content="View your scan history, track detected threats, and download security reports." />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="pt-20 pb-12">
          <div className="container mx-auto px-4">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8"
            >
              <h1 className="font-display text-3xl md:text-4xl font-bold mb-2">
                Scan <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Reports</span>
              </h1>
              <p className="text-muted-foreground">View and manage your security scan history</p>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
            >
              {[
                { label: "Total Scans", value: stats.total, color: "from-primary to-secondary" },
                { label: "Safe", value: stats.safe, color: "from-green-500 to-emerald-500" },
                { label: "Warnings", value: stats.warning, color: "from-amber-500 to-orange-500" },
                { label: "Threats", value: stats.danger, color: "from-red-500 to-rose-500" },
              ].map((stat, i) => (
                <div key={i} className="p-5 rounded-2xl bg-card/70 backdrop-blur-xl border border-border/50 shadow-xl">
                  <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center mb-3`}>
                    <span className="text-white font-bold">{stat.value}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </motion.div>

            {/* Filters */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex flex-col md:flex-row gap-4 mb-6"
            >
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search scans..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>

              <div className="flex gap-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="gap-2">
                      <Filter className="w-4 h-4" />
                      {filterType === "all" ? "All Types" : typeLabels[filterType]}
                      <ChevronDown className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem onClick={() => setFilterType("all")}>All Types</DropdownMenuItem>
                    {Object.entries(typeLabels).map(([key, label]) => (
                      <DropdownMenuItem key={key} onClick={() => setFilterType(key as ScanType)}>
                        {label}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="gap-2">
                      {filterStatus === "all" ? "All Status" : filterStatus.charAt(0).toUpperCase() + filterStatus.slice(1)}
                      <ChevronDown className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem onClick={() => setFilterStatus("all")}>All Status</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setFilterStatus("safe")}>Safe</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setFilterStatus("warning")}>Warning</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setFilterStatus("danger")}>Danger</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                <Button variant="cyber" className="gap-2">
                  <Download className="w-4 h-4" />
                  Export
                </Button>
              </div>
            </motion.div>

            {/* Table */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="rounded-2xl bg-card/70 backdrop-blur-xl border border-border/50 shadow-xl overflow-hidden"
            >
              <Table>
                <TableHeader>
                  <TableRow className="border-border/50 hover:bg-muted/50">
                    <TableHead>Type</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Score</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="hidden md:table-cell">Details</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredRecords.map((record, index) => {
                    const TypeIcon = typeIcons[record.type];
                    const statusStyle = statusStyles[record.status];
                    const StatusIcon = statusStyle.icon;

                    return (
                      <motion.tr
                        key={record.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="border-border/50 hover:bg-muted/50 cursor-pointer transition-colors"
                      >
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                              <TypeIcon className="w-4 h-4 text-primary" />
                            </div>
                            <span className="text-xs text-muted-foreground hidden sm:inline">
                              {typeLabels[record.type]}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell className="font-medium">{record.name}</TableCell>
                        <TableCell>
                          <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${statusStyle.bg} ${statusStyle.text}`}>
                            <StatusIcon className="w-3 h-3" />
                            {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
                          </span>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div className="w-12 h-2 rounded-full bg-muted overflow-hidden">
                              <div 
                                className={`h-full rounded-full ${
                                  record.score >= 70 ? "bg-success" :
                                  record.score >= 40 ? "bg-warning" :
                                  "bg-destructive"
                                }`}
                                style={{ width: `${record.score}%` }}
                              />
                            </div>
                            <span className="text-sm text-muted-foreground">{record.score}</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground">
                          {record.timestamp}
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground hidden md:table-cell">
                          {record.details}
                        </TableCell>
                      </motion.tr>
                    );
                  })}
                </TableBody>
              </Table>

              {filteredRecords.length === 0 && (
                <div className="p-12 text-center text-muted-foreground">
                  <Search className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>No scans found matching your criteria</p>
                </div>
              )}
            </motion.div>
          </div>
        </main>
      </div>
    </>
  );
};

export default Reports;
