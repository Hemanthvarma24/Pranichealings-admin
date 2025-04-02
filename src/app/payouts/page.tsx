'use client';

import { useState, Suspense } from 'react';
import { Header } from '@/components/dashboard/header';
import { Sidebar } from '@/components/dashboard/sidebar';
import { Footer } from '@/components/dashboard/footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Search, LinkIcon, Wallet, PiggyBank, ArrowDownToLine } from 'lucide-react';

interface PayoutTransaction {
  id: string;
  requestedDate: string;
  accountNo: string;
  creditedOn: string;
  amount: number;
  status: 'completed' | 'pending';
}

const mockTransactions: PayoutTransaction[] = [
  {
    id: 'AC-1234',
    requestedDate: '24 Mar 2024',
    accountNo: '5396 5250 1908 XXXX',
    creditedOn: '26 Mar 2024',
    amount: 300,
    status: 'completed',
  },
  {
    id: 'AC-1235',
    requestedDate: '28 Mar 2024',
    accountNo: '8833 8942 9013 XXXX',
    creditedOn: '30 Mar 2024',
    amount: 400,
    status: 'completed',
  },
  {
    id: 'AC-1237',
    requestedDate: '10 Apr 2024',
    accountNo: '5730 4892 0492 XXXX',
    creditedOn: '12 Apr 2024',
    amount: 320,
    status: 'pending',
  },
  {
    id: 'AC-124',
    requestedDate: '22 Mar 2024',
    accountNo: '5396 5250 1908 XXXX',
    creditedOn: '25 Mar 2024',
    amount: 300,
    status: 'completed',
  },
  {
    id: 'AC-1238',
    requestedDate: '24 Mar 2024',
    accountNo: '5396 5250 1908 XXXX',
    creditedOn: '26 Mar 2024',
    amount: 300,
    status: 'pending',
  },
];

const StatsCards: React.FC = () => (
  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mb-6">
    <Card>
      <CardContent className="flex items-center justify-between p-6">
        <div>
          <p className="text-sm font-medium text-muted-foreground">Total Balance</p>
          <h3 className="text-2xl font-bold mt-1">$900</h3>
        </div>
        <div className="rounded-full bg-primary/10 p-3">
          <Wallet className="h-6 w-6 text-primary" />
        </div>
      </CardContent>
    </Card>

    <Card>
      <CardContent className="flex items-center justify-between p-6">
        <div>
          <p className="text-sm font-medium text-muted-foreground">Earned</p>
          <h3 className="text-2xl font-bold mt-1">$906</h3>
        </div>
        <div className="rounded-full bg-primary/10 p-3">
          <PiggyBank className="h-6 w-6 text-primary" />
        </div>
      </CardContent>
    </Card>

    <Card>
      <CardContent className="flex items-center justify-between p-6">
        <div>
          <p className="text-sm font-medium text-muted-foreground">Requested</p>
          <h3 className="text-2xl font-bold mt-1">$50</h3>
        </div>
        <div className="rounded-full bg-primary/10 p-3">
          <ArrowDownToLine className="h-6 w-6 text-primary" />
        </div>
      </CardContent>
    </Card>
  </div>
);

// Client-side only component using useSearchParams
function RoleWrapper() {
  
  return <Sidebar/>;
}

// Fallback component to show while loading
function SidebarFallback() {
  return <div className="w-64 bg-gray-100 animate-pulse"></div>;
}

const PayoutsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredTransactions = mockTransactions.filter((transaction) => {
    const matchesSearch =
      transaction.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      transaction.accountNo.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTab = activeTab === 'all' || transaction.status === activeTab;
    return matchesSearch && matchesTab;
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-1 flex m-8">
        <Suspense fallback={<SidebarFallback />}>
          <RoleWrapper />
        </Suspense>
        <main className="flex-1 overflow-auto">
          <div className="container mx-auto p-6">
            <StatsCards />
            <Card>
              <CardHeader className="pb-4">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                  <Tabs defaultValue="all" className="w-full md:w-auto">
                    <TabsList>
                      <TabsTrigger value="all" onClick={() => setActiveTab('all')}>
                        All
                      </TabsTrigger>
                      <TabsTrigger value="completed" onClick={() => setActiveTab('completed')}>
                        Paid
                      </TabsTrigger>
                      <TabsTrigger value="pending" onClick={() => setActiveTab('pending')}>
                        Pending
                      </TabsTrigger>
                    </TabsList>
                  </Tabs>
                  <div className="relative w-full md:w-64">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search transactions..."
                      className="pl-8"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[100px]">ID</TableHead>
                        <TableHead>Requested Date</TableHead>
                        <TableHead>Account No</TableHead>
                        <TableHead>Credited On</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredTransactions.map((transaction) => (
                        <TableRow key={transaction.id}>
                          <TableCell className="font-medium">{transaction.id}</TableCell>
                          <TableCell>{transaction.requestedDate}</TableCell>
                          <TableCell>{transaction.accountNo}</TableCell>
                          <TableCell>{transaction.creditedOn}</TableCell>
                          <TableCell>${transaction.amount}</TableCell>
                          <TableCell>
                            <span
                              className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                                transaction.status === 'completed'
                                  ? 'bg-green-100 text-green-800'
                                  : 'bg-yellow-100 text-yellow-800'
                              }`}
                            >
                              {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                            </span>
                          </TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="icon" className="h-8 w-8 p-0">
                              <span className="sr-only">Open menu</span>
                              <LinkIcon className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default PayoutsPage;