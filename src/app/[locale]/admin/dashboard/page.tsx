"use client";

import { useState, useEffect } from "react";
import { ExchangeRate } from "@/types";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { cn } from "@/lib/utils";

export default function AdminDashboard() {
  const [rates, setRates] = useState<ExchangeRate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  
  // Settings State
  const [newUsername, setNewUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [settingsMsg, setSettingsMsg] = useState("");

  const handleSettingsUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setSettingsMsg("Updating...");
    
    try {
      const res = await fetch("/api/admin/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          newUsername: newUsername || undefined,
          newPassword: newPassword || undefined,
          currentPassword
        }),
      });

      const data = await res.json();
      
      if (res.ok) {
        setSettingsMsg("Settings updated successfully!");
        setNewPassword("");
        setCurrentPassword("");
      } else {
        setSettingsMsg(`Error: ${data.error}`);
      }
    } catch (error) {
      setSettingsMsg("Failed to update settings");
    }
  };

  useEffect(() => {
    fetchRates();
  }, []);

  const fetchRates = async () => {
    try {
      const res = await fetch("/api/admin/rates", {
        cache: 'no-store'
      });
      if (res.ok) {
        const data = await res.json();
        setRates(data);
      } else if (res.status === 401) {
        window.location.href = "/admin/login";
      } else {
        setError(`Failed to load rates (Status: ${res.status})`);
      }
    } catch (error) {
      console.error("Failed to fetch rates");
      setError("Connection error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (newRates: ExchangeRate[]) => {
    setSaving(true);
    setRates(newRates);
    
    try {
      await fetch("/api/admin/rates", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newRates),
      });
    } catch (error) {
      console.error("Failed to save rates");
    } finally {
      setSaving(false);
    }
  };

  const updateRateValue = (currency: string, field: 'buyRate' | 'sellRate', value: string) => {
    // Allow empty string to let user delete content
    if (value === "") {
      const newRates = rates.map(r => 
        r.currency === currency ? { ...r, [field]: "" as unknown as number } : r
      );
      setRates(newRates);
      return;
    }

    const numValue = parseFloat(value);
    // Only update if it's a valid number
    if (!isNaN(numValue)) {
      const newRates = rates.map(r => 
        r.currency === currency ? { ...r, [field]: numValue } : r
      );
      handleUpdate(newRates);
    }
  };

  const toggleStatus = (currency: string) => {
    const newRates = rates.map(r => 
      r.currency === currency ? { ...r, isDisabled: !r.isDisabled } : r
    );
    handleUpdate(newRates);
  };

  if (loading) return <div className="p-10 text-center text-white">Loading...</div>;

  return (
    <div className="min-h-screen bg-[var(--background)] pt-24 pb-12 px-4">
      <div className="container mx-auto max-w-5xl">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-playfair font-bold text-[#111827]">
            Rate Management
          </h1>
          <div className="text-sm text-[#6B7280]">
            {saving ? "Saving..." : "All changes saved"}
          </div>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
            <strong className="font-bold">Error: </strong>
            <span className="block sm:inline">{error}</span>
          </div>
        )}

        <Card variant="default" className="overflow-hidden bg-white border border-gray-200 shadow-md mb-12">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="p-4 text-sm font-medium text-[#6B7280]">Currency</th>
                  <th className="p-4 text-sm font-medium text-[#6B7280]">Buy Rate</th>
                  <th className="p-4 text-sm font-medium text-[#6B7280]">Sell Rate</th>
                  <th className="p-4 text-sm font-medium text-[#6B7280]">Status</th>
                  <th className="p-4 text-sm font-medium text-[#6B7280]">Last Updated</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {rates.map((rate) => (
                  <tr key={rate.currency} className="hover:bg-gray-50 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{rate.flag}</span>
                        <div>
                          <div className="font-bold text-[#111827]">{rate.currency}</div>
                          <div className="text-xs text-[#6B7280]">{rate.name}</div>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <input
                        type="number"
                        step="0.01"
                        value={rate.buyRate}
                        onChange={(e) => updateRateValue(rate.currency, 'buyRate', e.target.value)}
                        className="w-24 px-2 py-1 bg-white border border-gray-300 rounded text-[#111827] font-mono focus:border-[#6B7280] focus:ring-1 focus:ring-[#6B7280] outline-none"
                      />
                    </td>
                    <td className="p-4">
                      <input
                        type="number"
                        step="0.01"
                        value={rate.sellRate}
                        onChange={(e) => updateRateValue(rate.currency, 'sellRate', e.target.value)}
                        className="w-24 px-2 py-1 bg-white border border-gray-300 rounded text-[#111827] font-mono focus:border-[#6B7280] focus:ring-1 focus:ring-[#6B7280] outline-none"
                      />
                    </td>
                    <td className="p-4">
                      <button
                        onClick={() => toggleStatus(rate.currency)}
                        className={cn(
                          "px-3 py-1 rounded-full text-xs font-medium transition-colors",
                          rate.isDisabled
                            ? "bg-red-100 text-red-700 hover:bg-red-200"
                            : "bg-green-100 text-green-700 hover:bg-green-200"
                        )}
                      >
                        {rate.isDisabled ? "Disabled" : "Active"}
                      </button>
                    </td>
                    <td className="p-4 text-sm text-[#6B7280]">
                      {new Date(rate.lastUpdated).toLocaleTimeString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <div className="mb-8">
          <h2 className="text-2xl font-playfair font-bold text-[#111827] mb-6">
            Admin Security
          </h2>
          <Card variant="default" className="bg-white border border-gray-200 shadow-md p-6 max-w-2xl">
            <form onSubmit={handleSettingsUpdate} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">New Username (Optional)</label>
                  <input
                    type="text"
                    value={newUsername}
                    onChange={(e) => setNewUsername(e.target.value)}
                    placeholder="Leave blank to keep current"
                    className="w-full px-4 py-2 bg-white border border-gray-300 rounded text-[#111827] focus:border-[#6B7280] focus:ring-1 focus:ring-[#6B7280] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">New Password (Optional)</label>
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Leave blank to keep current"
                    className="w-full px-4 py-2 bg-white border border-gray-300 rounded text-[#111827] focus:border-[#6B7280] focus:ring-1 focus:ring-[#6B7280] outline-none"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Current Password (Required)</label>
                <input
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="Enter current password to confirm changes"
                  required
                  className="w-full px-4 py-2 bg-white border border-gray-300 rounded text-[#111827] focus:border-[#6B7280] focus:ring-1 focus:ring-[#6B7280] outline-none"
                />
              </div>
              <div className="flex justify-between items-center">
                <span className={cn("text-sm", settingsMsg.includes("Error") ? "text-red-600" : "text-green-600")}>
                  {settingsMsg}
                </span>
                <Button type="submit" variant="primary" className="bg-[#6B7280] hover:bg-[#4B5563]">
                  Update Credentials
                </Button>
              </div>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
}
