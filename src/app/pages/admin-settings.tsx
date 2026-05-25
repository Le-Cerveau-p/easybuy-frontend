import { useState } from "react";
import { Save, Moon, Sun } from "lucide-react";
import { useTheme } from "../components/theme-provider";

export function AdminSettingsPage() {
  const [activeTab, setActiveTab] = useState("general");
  const { theme, toggleTheme } = useTheme();

  const tabs = [
    { id: "general", label: "General" },
    { id: "branding", label: "Branding" },
    { id: "payment", label: "Payment" },
    { id: "notifications", label: "Notifications" },
    { id: "security", label: "Security" },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Settings</h1>
        <p className="text-muted-foreground">Manage your admin portal preferences</p>
      </div>

      {/* Tabs */}
      <div className="border-b border-border mb-8">
        <div className="flex gap-6 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`pb-4 border-b-2 font-semibold whitespace-nowrap transition-colors ${
                activeTab === tab.id
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* General Tab */}
      {activeTab === "general" && (
        <div className="space-y-6">
          <div className="bg-card border border-border rounded-2xl p-6">
            <h2 className="text-xl font-bold mb-6">General Settings</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-2">Store Name</label>
                <input
                  type="text"
                  defaultValue="EasyBuy"
                  className="w-full px-4 py-2.5 rounded-xl bg-input border border-border focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Store Email</label>
                <input
                  type="email"
                  defaultValue="admin@easybuy.com"
                  className="w-full px-4 py-2.5 rounded-xl bg-input border border-border focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Store Phone</label>
                <input
                  type="tel"
                  defaultValue="+234 800 123 4567"
                  className="w-full px-4 py-2.5 rounded-xl bg-input border border-border focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
              <div className="flex items-center justify-between p-4 bg-muted/30 rounded-xl">
                <div>
                  <div className="font-semibold">Theme</div>
                  <div className="text-sm text-muted-foreground">
                    Current: {theme === "light" ? "Light" : "Dark"}
                  </div>
                </div>
                <button
                  onClick={toggleTheme}
                  className="p-3 bg-card border border-border rounded-xl hover:bg-muted transition-all"
                >
                  {theme === "light" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
                </button>
              </div>
              <button className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-xl font-semibold hover:bg-primary/90 transition-all">
                <Save className="h-5 w-5" />
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Payment Tab */}
      {activeTab === "payment" && (
        <div className="space-y-6">
          <div className="bg-card border border-border rounded-2xl p-6">
            <h2 className="text-xl font-bold mb-6">Flutterwave Integration</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-2">Public Key</label>
                <input
                  type="text"
                  placeholder="FLWPUBK-xxxxx"
                  className="w-full px-4 py-2.5 rounded-xl bg-input border border-border focus:outline-none focus:ring-2 focus:ring-ring font-mono"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Secret Key</label>
                <input
                  type="password"
                  placeholder="FLWSECK-xxxxx"
                  className="w-full px-4 py-2.5 rounded-xl bg-input border border-border focus:outline-none focus:ring-2 focus:ring-ring font-mono"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Encryption Key</label>
                <input
                  type="password"
                  placeholder="FLWSECK_TESTxxxxx"
                  className="w-full px-4 py-2.5 rounded-xl bg-input border border-border focus:outline-none focus:ring-2 focus:ring-ring font-mono"
                />
              </div>
              <div className="flex items-center gap-3 p-4 bg-primary/10 border border-primary/20 rounded-xl">
                <input
                  type="checkbox"
                  id="testMode"
                  className="h-5 w-5 rounded border-border text-primary focus:ring-2 focus:ring-ring"
                />
                <label htmlFor="testMode" className="text-sm font-semibold">
                  Enable Test Mode
                </label>
              </div>
              <button className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-xl font-semibold hover:bg-primary/90 transition-all">
                <Save className="h-5 w-5" />
                Save Payment Settings
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Other tabs */}
      {["branding", "notifications", "security"].includes(activeTab) && (
        <div className="bg-card border border-border rounded-2xl p-12 text-center">
          <h3 className="text-xl font-semibold mb-2">{tabs.find(t => t.id === activeTab)?.label} Settings</h3>
          <p className="text-muted-foreground">Configuration options for {activeTab} will be displayed here</p>
        </div>
      )}
    </div>
  );
}
