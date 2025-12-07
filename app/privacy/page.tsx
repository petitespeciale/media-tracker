export default function PrivacyPolicy() {
    return (
        <main className="container mx-auto max-w-4xl px-4 py-12 text-foreground">
            <h1 className="mb-8 text-3xl font-bold">Privacy Policy for mediaTRACKER</h1>
            <p className="mb-4 text-sm text-muted-foreground">Last Updated: December 6, 2025</p>

            <section className="mb-8 space-y-4">
                <h2 className="text-2xl font-semibold">Introduction</h2>
                <p>
                    Welcome to mediaTRACKER ("we," "our," or "us"). This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our web application at https://media-tracker-cinema-log.vercel.app/ (the "Service").
                </p>
                <p>
                    Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access the Service.
                </p>
            </section>

            <section className="mb-8 space-y-4">
                <h2 className="text-2xl font-semibold">Information We Collect</h2>

                <h3 className="text-xl font-medium">Personal Information You Provide</h3>
                <p>When you register for an account, we collect:</p>
                <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Email address</strong> - Used for account creation, authentication, and communication</li>
                    <li><strong>Password</strong> - Encrypted and stored securely through Supabase authentication</li>
                    <li><strong>Profile information</strong> - Any optional profile details you choose to provide</li>
                </ul>

                <h3 className="text-xl font-medium mt-6">Usage Data</h3>
                <p>We automatically collect certain information about your use of the Service:</p>
                <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Media tracking data</strong> - Movies and TV shows you mark as "Watched," "Watching," or "Plan to Watch"</li>
                    <li><strong>Viewing history</strong> - Timestamps and status changes for tracked media</li>
                    <li><strong>Device information</strong> - Browser type, operating system, and device identifiers</li>
                    <li><strong>Log data</strong> - IP address, access times, and pages viewed</li>
                </ul>

                <h3 className="text-xl font-medium mt-6">Local Storage</h3>
                <p>Our Service uses browser localStorage to:</p>
                <ul className="list-disc pl-6 space-y-2">
                    <li>Cache your media tracking data for offline functionality</li>
                    <li>Improve app performance by reducing server requests</li>
                    <li>Provide instant loading of your tracked content</li>
                </ul>
                <p>This data is stored locally on your device and is synchronized with our cloud database when you're online.</p>
            </section>

            <section className="mb-8 space-y-4">
                <h2 className="text-2xl font-semibold">How We Use Your Information</h2>
                <p>We use the information we collect to:</p>
                <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Provide and maintain the Service</strong> - Enable account access and data synchronization</li>
                    <li><strong>Improve user experience</strong> - Optimize app performance and add new features</li>
                    <li><strong>Communicate with you</strong> - Send account-related notifications and updates</li>
                    <li><strong>Ensure security</strong> - Detect and prevent fraudulent activity or abuse</li>
                    <li><strong>Comply with legal obligations</strong> - Respond to legal requests when required</li>
                </ul>
            </section>

            <section className="mb-8 space-y-4">
                <h2 className="text-2xl font-semibold">Third-Party Services</h2>
                <p>Our Service integrates with the following third-party services:</p>

                <div className="space-y-4">
                    <div>
                        <h3 className="text-lg font-medium">Supabase (Database & Authentication)</h3>
                        <ul className="list-disc pl-6">
                            <li>Purpose: User authentication and cloud data storage</li>
                            <li>Data shared: Email, encrypted password, media tracking data</li>
                            <li>Privacy Policy: <a href="https://supabase.com/privacy" className="text-primary hover:underline">https://supabase.com/privacy</a></li>
                            <li>Location: Data stored on Supabase servers</li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-lg font-medium">The Movie Database (TMDB) API</h3>
                        <ul className="list-disc pl-6">
                            <li>Purpose: Retrieve movie and TV show information, posters, and metadata</li>
                            <li>Data shared: Your search queries and media selections</li>
                            <li>Privacy Policy: <a href="https://www.themoviedb.org/privacy-policy" className="text-primary hover:underline">https://www.themoviedb.org/privacy-policy</a></li>
                            <li>Note: We do not share your personal identification information with TMDB</li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-lg font-medium">Vercel (Hosting)</h3>
                        <ul className="list-disc pl-6">
                            <li>Purpose: Web application hosting and deployment</li>
                            <li>Data collected: Standard web server logs (IP addresses, page requests)</li>
                            <li>Privacy Policy: <a href="https://vercel.com/legal/privacy-policy" className="text-primary hover:underline">https://vercel.com/legal/privacy-policy</a></li>
                        </ul>
                    </div>
                </div>
            </section>

            <section className="mb-8 space-y-4">
                <h2 className="text-2xl font-semibold">Data Storage and Security</h2>
                <h3 className="text-xl font-medium">How We Store Your Data</h3>
                <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Cloud Database:</strong> Your account information and tracked media are stored in Supabase's PostgreSQL database</li>
                    <li><strong>Local Storage:</strong> A copy of your tracking data is cached in your browser's localStorage for offline access</li>
                    <li><strong>Encryption:</strong> Passwords are hashed and encrypted; data transmitted via HTTPS</li>
                </ul>

                <h3 className="text-xl font-medium mt-6">Security Measures</h3>
                <p>We implement reasonable security measures to protect your information, including:</p>
                <ul className="list-disc pl-6 space-y-2">
                    <li>Encrypted connections (SSL/TLS)</li>
                    <li>Secure authentication via Supabase</li>
                    <li>Regular security updates and monitoring</li>
                </ul>
                <p>However, no method of transmission over the Internet is 100% secure. While we strive to protect your personal information, we cannot guarantee its absolute security.</p>
            </section>

            <section className="mb-8 space-y-4">
                <h2 className="text-2xl font-semibold">Data Retention</h2>
                <p>We retain your personal information for as long as your account is active or as needed to provide you the Service. You may request deletion of your account and data at any time by contacting us.</p>
            </section>

            <section className="mb-8 space-y-4">
                <h2 className="text-2xl font-semibold">Your Data Rights</h2>
                <p>Depending on your location, you may have the following rights:</p>
                <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Access</strong> - Request a copy of your personal data</li>
                    <li><strong>Correction</strong> - Update or correct inaccurate information</li>
                    <li><strong>Deletion</strong> - Request deletion of your account and associated data</li>
                    <li><strong>Data Portability</strong> - Export your tracked media data</li>
                    <li><strong>Withdraw Consent</strong> - Opt-out of optional data collection</li>
                </ul>
                <p>To exercise these rights, please contact us at <a href="mailto:bycarmille@gmail.com" className="text-primary hover:underline">bycarmille@gmail.com</a>.</p>
            </section>

            <section className="mb-8 space-y-4">
                <h2 className="text-2xl font-semibold">Cookies and Tracking Technologies</h2>
                <p>Our Service uses:</p>
                <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Session cookies</strong> - To maintain your login state</li>
                    <li><strong>Local Storage</strong> - To cache your media tracking data</li>
                    <li><strong>Analytics (if enabled)</strong> - To understand how users interact with our Service</li>
                </ul>
                <p>You can control cookies through your browser settings, but disabling them may limit functionality.</p>
            </section>

            <section className="mb-8 space-y-4">
                <h2 className="text-2xl font-semibold">Children's Privacy</h2>
                <p>Our Service is not intended for users under the age of 13. We do not knowingly collect personal information from children under 13. If you believe we have collected information from a child under 13, please contact us immediately.</p>
                <p>In compliance with TMDB's terms of service, users must be at least 13 years old to use this Service.</p>
            </section>

            <section className="mb-8 space-y-4">
                <h2 className="text-2xl font-semibold">International Data Transfers</h2>
                <p>Your information may be transferred to and maintained on servers located outside of your state, province, country, or other governmental jurisdiction where data protection laws may differ. By using the Service, you consent to this transfer.</p>
            </section>

            <section className="mb-8 space-y-4">
                <h2 className="text-2xl font-semibold">Changes to This Privacy Policy</h2>
                <p>We may update this Privacy Policy from time to time. We will notify you of any changes by:</p>
                <ul className="list-disc pl-6 space-y-2">
                    <li>Updating the "Last Updated" date at the top of this policy</li>
                    <li>Posting a notice on our Service</li>
                    <li>Sending you an email notification (for material changes)</li>
                </ul>
                <p>Your continued use of the Service after changes are posted constitutes acceptance of the updated policy.</p>
            </section>

            <section className="mb-8 space-y-4">
                <h2 className="text-2xl font-semibold">California Privacy Rights</h2>
                <p>If you are a California resident, you have additional rights under the California Consumer Privacy Act (CCPA):</p>
                <ul className="list-disc pl-6 space-y-2">
                    <li>Right to know what personal information is collected</li>
                    <li>Right to know if personal information is sold or disclosed</li>
                    <li>Right to say no to the sale of personal information (we do not sell your data)</li>
                    <li>Right to deletion</li>
                    <li>Right to equal service and price</li>
                </ul>
            </section>

            <section className="mb-8 space-y-4">
                <h2 className="text-2xl font-semibold">Contact Us</h2>
                <p>If you have questions or concerns about this Privacy Policy, please contact us:</p>
                <p>Email: <a href="mailto:bycarmille@gmail.com" className="text-primary hover:underline">bycarmille@gmail.com</a></p>
                <p>Website: <a href="https://media-tracker-cinema-log.vercel.app/" className="text-primary hover:underline">https://media-tracker-cinema-log.vercel.app/</a></p>
            </section>
        </main>
    );
}
