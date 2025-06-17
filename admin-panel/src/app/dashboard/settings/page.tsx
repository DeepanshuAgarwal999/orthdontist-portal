'use client';

import React from 'react';
import { Settings, Save, Shield, Mail, Globe, Database } from 'lucide-react';

export default function SettingsPage() {
    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
                <p className="text-gray-600">Manage your application settings and configurations</p>
            </div>

            {/* Settings Sections */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* General Settings */}
                <div className="bg-white shadow-sm rounded-lg border border-gray-200">
                    <div className="px-6 py-4 border-b border-gray-200">
                        <h3 className="text-lg font-medium text-gray-900 flex items-center gap-2">
                            <Settings className="w-5 h-5" />
                            General Settings
                        </h3>
                    </div>
                    <div className="p-6 space-y-4">
                        <div>
                            <label htmlFor="siteName" className="block text-sm font-medium text-gray-700 mb-2">
                                Site Name
                            </label>
                            <input
                                type="text"
                                id="siteName"
                                defaultValue="Dentist Portal"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>
                        <div>
                            <label htmlFor="siteDescription" className="block text-sm font-medium text-gray-700 mb-2">
                                Site Description
                            </label>
                            <textarea
                                id="siteDescription"
                                rows={3}
                                defaultValue="Professional dental services platform"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>
                        <div>
                            <label htmlFor="contactEmail" className="block text-sm font-medium text-gray-700 mb-2">
                                Contact Email
                            </label>
                            <input
                                type="email"
                                id="contactEmail"
                                defaultValue="admin@dentistportal.com"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>
                    </div>
                </div>

                {/* Security Settings */}
                <div className="bg-white shadow-sm rounded-lg border border-gray-200">
                    <div className="px-6 py-4 border-b border-gray-200">
                        <h3 className="text-lg font-medium text-gray-900 flex items-center gap-2">
                            <Shield className="w-5 h-5" />
                            Security Settings
                        </h3>
                    </div>
                    <div className="p-6 space-y-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <div className="text-sm font-medium text-gray-900">Two-Factor Authentication</div>
                                <div className="text-sm text-gray-500">Add an extra layer of security</div>
                            </div>
                            <button className="bg-blue-100 text-blue-800 px-3 py-1 rounded-md text-sm">
                                Enable
                            </button>
                        </div>
                        <div className="flex items-center justify-between">
                            <div>
                                <div className="text-sm font-medium text-gray-900">Session Timeout</div>
                                <div className="text-sm text-gray-500">Auto logout after inactivity</div>
                            </div>
                            <select className="px-3 py-1 border border-gray-300 rounded-md text-sm">
                                <option>30 minutes</option>
                                <option>1 hour</option>
                                <option>2 hours</option>
                                <option>4 hours</option>
                            </select>
                        </div>
                        <div className="flex items-center justify-between">
                            <div>
                                <div className="text-sm font-medium text-gray-900">Login Attempts</div>
                                <div className="text-sm text-gray-500">Max failed login attempts</div>
                            </div>
                            <select className="px-3 py-1 border border-gray-300 rounded-md text-sm">
                                <option>3 attempts</option>
                                <option>5 attempts</option>
                                <option>10 attempts</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Email Settings */}
                <div className="bg-white shadow-sm rounded-lg border border-gray-200">
                    <div className="px-6 py-4 border-b border-gray-200">
                        <h3 className="text-lg font-medium text-gray-900 flex items-center gap-2">
                            <Mail className="w-5 h-5" />
                            Email Settings
                        </h3>
                    </div>
                    <div className="p-6 space-y-4">
                        <div>
                            <label htmlFor="smtpHost" className="block text-sm font-medium text-gray-700 mb-2">
                                SMTP Host
                            </label>
                            <input
                                type="text"
                                id="smtpHost"
                                placeholder="smtp.example.com"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="smtpPort" className="block text-sm font-medium text-gray-700 mb-2">
                                    Port
                                </label>
                                <input
                                    type="number"
                                    id="smtpPort"
                                    defaultValue="587"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>
                            <div>
                                <label htmlFor="encryption" className="block text-sm font-medium text-gray-700 mb-2">
                                    Encryption
                                </label>
                                <select
                                    id="encryption"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                >
                                    <option>TLS</option>
                                    <option>SSL</option>
                                    <option>None</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

                {/* API Settings */}
                <div className="bg-white shadow-sm rounded-lg border border-gray-200">
                    <div className="px-6 py-4 border-b border-gray-200">
                        <h3 className="text-lg font-medium text-gray-900 flex items-center gap-2">
                            <Globe className="w-5 h-5" />
                            API Settings
                        </h3>
                    </div>
                    <div className="p-6 space-y-4">
                        <div>
                            <label htmlFor="apiUrl" className="block text-sm font-medium text-gray-700 mb-2">
                                API Base URL
                            </label>
                            <input
                                type="url"
                                id="apiUrl"
                                defaultValue="http://localhost:8080/api/v1"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>
                        <div className="flex items-center justify-between">
                            <div>
                                <div className="text-sm font-medium text-gray-900">API Rate Limiting</div>
                                <div className="text-sm text-gray-500">Requests per minute per IP</div>
                            </div>
                            <input
                                type="number"
                                defaultValue="100"
                                className="w-20 px-3 py-1 border border-gray-300 rounded-md text-sm"
                            />
                        </div>
                        <div className="flex items-center justify-between">
                            <div>
                                <div className="text-sm font-medium text-gray-900">API Documentation</div>
                                <div className="text-sm text-gray-500">Enable Swagger UI</div>
                            </div>
                            <button className="bg-green-100 text-green-800 px-3 py-1 rounded-md text-sm">
                                Enabled
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Save Button */}
            <div className="flex justify-end">
                <button className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center gap-2">
                    <Save className="w-4 h-4" />
                    Save Settings
                </button>
            </div>

            {/* Note */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4">
                <div className="flex">
                    <div className="flex-shrink-0">
                        <Database className="h-5 w-5 text-yellow-400" />
                    </div>
                    <div className="ml-3">
                        <h3 className="text-sm font-medium text-yellow-800">Settings Configuration</h3>
                        <div className="mt-2 text-sm text-yellow-700">
                            <p>
                                These settings are currently for display purposes. In a production environment,
                                these would be connected to your backend configuration system and database.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
