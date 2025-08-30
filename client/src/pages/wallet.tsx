import { Link } from "wouter";
import { ArrowLeft, MoreVertical, Clock, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BottomNavigation } from "@/components/bottom-navigation";
import { mockTransactions } from "@/lib/mock-data";

export default function Wallet() {
  const walletData = {
    balance: "12,540",
    pending: "1,200",
    thisMonth: "18,300",
  };

  return (
    <div className="min-h-screen pb-20">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <Link href="/home">
          <button className="p-2 hover:bg-secondary rounded-lg" data-testid="button-back">
            <ArrowLeft className="w-5 h-5 text-foreground" />
          </button>
        </Link>
        <h1 className="text-lg font-semibold text-foreground">Wallet</h1>
        <button className="p-2 hover:bg-secondary rounded-lg">
          <MoreVertical className="w-5 h-5 text-foreground" />
        </button>
      </div>

      <div className="p-4">
        {/* Current Balance */}
        <div className="text-center mb-6">
          <p className="text-muted-foreground text-sm mb-2">Current balance</p>
          <h2 className="text-4xl font-bold text-foreground mb-4">₹{walletData.balance}</h2>
          <div className="flex justify-center gap-4">
            <Button data-testid="button-add-money">Add</Button>
            <Button variant="secondary" data-testid="button-send-money">Send</Button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-orange-50 border border-orange-200 rounded-xl p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-700 text-sm font-medium">Pending</p>
                <p className="text-orange-900 text-xl font-bold">₹{walletData.pending}</p>
              </div>
              <Clock className="w-5 h-5 text-orange-500" />
            </div>
          </div>
          <div className="bg-green-50 border border-green-200 rounded-xl p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-700 text-sm font-medium">This month</p>
                <p className="text-green-900 text-xl font-bold">₹{walletData.thisMonth}</p>
              </div>
              <TrendingUp className="w-5 h-5 text-green-500" />
            </div>
          </div>
        </div>

        {/* Transaction Tabs */}
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-foreground mb-4">Transactions</h3>
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="all" data-testid="tab-all">All</TabsTrigger>
              <TabsTrigger value="earnings" data-testid="tab-earnings">Earnings</TabsTrigger>
              <TabsTrigger value="payouts" data-testid="tab-payouts">Payouts</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all" className="mt-4">
              <div className="space-y-4">
                {mockTransactions.map((transaction) => (
                  <div key={transaction.id} className="flex items-center gap-4 py-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      transaction.type === "earning" ? "bg-green-100" : "bg-red-100"
                    }`}>
                      <i className={`${transaction.icon} ${transaction.iconColor}`}></i>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-foreground">{transaction.title}</h4>
                      <p className="text-muted-foreground text-sm">{transaction.details}</p>
                    </div>
                    <div className="text-right">
                      <span className={`font-bold ${
                        transaction.type === "earning" ? "text-green-600" : "text-red-600"
                      }`}>
                        {transaction.amount}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="earnings" className="mt-4">
              <div className="space-y-4">
                {mockTransactions.filter(t => t.type === "earning").map((transaction) => (
                  <div key={transaction.id} className="flex items-center gap-4 py-3">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <i className={`${transaction.icon} ${transaction.iconColor}`}></i>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-foreground">{transaction.title}</h4>
                      <p className="text-muted-foreground text-sm">{transaction.details}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-green-600 font-bold">{transaction.amount}</span>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="payouts" className="mt-4">
              <div className="space-y-4">
                {mockTransactions.filter(t => t.type === "payout").map((transaction) => (
                  <div key={transaction.id} className="flex items-center gap-4 py-3">
                    <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                      <i className={`${transaction.icon} ${transaction.iconColor}`}></i>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-foreground">{transaction.title}</h4>
                      <p className="text-muted-foreground text-sm">{transaction.details}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-red-600 font-bold">{transaction.amount}</span>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Linked Accounts */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Linked accounts</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-4 bg-card border border-border rounded-xl">
              <div className="flex items-center gap-3">
                <i className="fas fa-university text-blue-600"></i>
                <div>
                  <h4 className="font-semibold text-foreground">HDFC Bank</h4>
                  <p className="text-muted-foreground text-sm">••••9210 • Primary</p>
                </div>
              </div>
              <button className="text-primary text-sm font-medium hover:underline" data-testid="button-manage-bank">
                Manage
              </button>
            </div>
            <div className="flex items-center justify-between p-4 bg-card border border-border rounded-xl">
              <div className="flex items-center gap-3">
                <i className="fas fa-mobile-alt text-purple-600"></i>
                <div>
                  <h4 className="font-semibold text-foreground">UPI</h4>
                  <p className="text-muted-foreground text-sm">anita@upi</p>
                </div>
              </div>
              <button className="text-primary text-sm font-medium hover:underline" data-testid="button-manage-upi">
                Manage
              </button>
            </div>
          </div>
        </div>

        {/* Withdraw Button */}
        <div className="mb-20">
          <Button className="w-full py-4 text-base" data-testid="button-withdraw">
            Withdraw to bank
          </Button>
        </div>
      </div>

      <BottomNavigation />
    </div>
  );
}
