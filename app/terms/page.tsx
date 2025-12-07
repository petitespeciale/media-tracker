export default function TermsOfService() {
    return (
        <main className="container mx-auto max-w-4xl px-4 py-12 text-foreground">
            <h1 className="mb-8 text-3xl font-bold">Terms of Service for mediaTRACKER</h1>
            <p className="mb-4 text-sm text-muted-foreground">Last Updated: December 6, 2025</p>

            <section className="mb-8 space-y-4">
                <h2 className="text-2xl font-semibold">Agreement to Terms</h2>
                <p>
                    By accessing or using mediaTRACKER ("Service," "App," "we," "us," or "our") available at https://media-tracker-cinema-log.vercel.app/, you agree to be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, do not use the Service.
                </p>
            </section>

            <section className="mb-8 space-y-4">
                <h2 className="text-2xl font-semibold">Description of Service</h2>
                <p>mediaTRACKER is a personal media tracking application that allows users to:</p>
                <ul className="list-disc pl-6 space-y-2">
                    <li>Search for movies and TV shows using The Movie Database (TMDB) API</li>
                    <li>Track viewing status (Watched, Watching, Plan to Watch)</li>
                    <li>Manage personal watchlists and viewing history</li>
                    <li>Sync data across devices via cloud storage</li>
                </ul>
            </section>

            <section className="mb-8 space-y-4">
                <h2 className="text-2xl font-semibold">Eligibility</h2>
                <p>You must be at least 13 years old to use this Service. By using the Service, you represent and warrant that you meet this age requirement.</p>
                <p>If you are under 18, you represent that you have your parent or guardian's permission to use the Service and they have read and agreed to these Terms.</p>
            </section>

            <section className="mb-8 space-y-4">
                <h2 className="text-2xl font-semibold">Account Registration</h2>
                <h3 className="text-xl font-medium">Creating an Account</h3>
                <ul className="list-disc pl-6 space-y-2">
                    <li>You must provide a valid email address and create a password</li>
                    <li>You are responsible for maintaining the confidentiality of your account credentials</li>
                    <li>You are responsible for all activities that occur under your account</li>
                    <li>You must notify us immediately of any unauthorized use of your account</li>
                </ul>

                <h3 className="text-xl font-medium mt-6">Account Security</h3>
                <ul className="list-disc pl-6 space-y-2">
                    <li>You agree to provide accurate and complete information</li>
                    <li>You agree not to share your account with others</li>
                    <li>You agree to use a strong, unique password</li>
                    <li>We reserve the right to suspend or terminate accounts that violate these Terms</li>
                </ul>
            </section>

            <section className="mb-8 space-y-4">
                <h2 className="text-2xl font-semibold">Acceptable Use</h2>
                <p>You agree NOT to:</p>
                <ul className="list-disc pl-6 space-y-2">
                    <li>Use the Service for any illegal purpose or in violation of any laws</li>
                    <li>Violate the intellectual property rights of others</li>
                    <li>Attempt to gain unauthorized access to the Service or other users' accounts</li>
                    <li>Upload viruses, malware, or any malicious code</li>
                    <li>Scrape, harvest, or collect data from the Service using automated means</li>
                    <li>Impersonate another person or entity</li>
                    <li>Harass, abuse, or harm other users</li>
                    <li>Use the Service to distribute spam or unsolicited communications</li>
                    <li>Attempt to reverse engineer, decompile, or disassemble the Service</li>
                    <li>Remove or modify any copyright, trademark, or proprietary notices</li>
                    <li>Use the Service in any way that could damage, disable, or impair our servers</li>
                </ul>
            </section>

            <section className="mb-8 space-y-4">
                <h2 className="text-2xl font-semibold">Third-Party Services and Content</h2>
                <h3 className="text-xl font-medium">TMDB API</h3>
                <p>This product uses the TMDB API but is not endorsed or certified by TMDB. All movie and TV show data, including posters, descriptions, and metadata, are provided by The Movie Database (TMDB).</p>
                <ul className="list-disc pl-6 space-y-2">
                    <li>You agree to comply with TMDB's Terms of Use: <a href="https://www.themoviedb.org/terms-of-use" className="text-primary hover:underline">https://www.themoviedb.org/terms-of-use</a></li>
                    <li>All content from TMDB remains the property of TMDB and its content providers</li>
                    <li>We do not claim ownership of any TMDB content displayed in the Service</li>
                </ul>

                <h3 className="text-xl font-medium mt-6">Supabase</h3>
                <p>User authentication and data storage are provided by Supabase. By using the Service, you also agree to comply with Supabase's Terms of Service and Privacy Policy.</p>

                <h3 className="text-xl font-medium mt-6">External Links</h3>
                <p>The Service may contain links to third-party websites. We are not responsible for the content, privacy policies, or practices of any third-party sites.</p>
            </section>

            <section className="mb-8 space-y-4">
                <h2 className="text-2xl font-semibold">User Content and Data</h2>
                <h3 className="text-xl font-medium">Your Tracking Data</h3>
                <ul className="list-disc pl-6 space-y-2">
                    <li>You retain ownership of your personal tracking data (watchlists, viewing history)</li>
                    <li>You grant us a license to store and process this data to provide the Service</li>
                    <li>You can export or delete your data at any time by contacting us</li>
                    <li>We will not sell your personal tracking data to third parties</li>
                </ul>

                <h3 className="text-xl font-medium mt-6">Data Backup</h3>
                <p>While we use Supabase for cloud synchronization, you are responsible for maintaining your own backups of important data. We are not liable for any data loss.</p>
            </section>

            <section className="mb-8 space-y-4">
                <h2 className="text-2xl font-semibold">Intellectual Property</h2>
                <h3 className="text-xl font-medium">Our Rights</h3>
                <p>The Service, including its design, code, features, and original content (excluding TMDB content), is owned by mediaTRACKER and protected by copyright, trademark, and other intellectual property laws.</p>

                <h3 className="text-xl font-medium mt-6">Limited License</h3>
                <p>We grant you a limited, non-exclusive, non-transferable, revocable license to use the Service for personal, non-commercial purposes in accordance with these Terms.</p>

                <h3 className="text-xl font-medium mt-6">Restrictions</h3>
                <p>You may not:</p>
                <ul className="list-disc pl-6 space-y-2">
                    <li>Copy, modify, or create derivative works of the Service</li>
                    <li>Sell, rent, lease, or sublicense access to the Service</li>
                    <li>Use the Service for commercial purposes without our written permission</li>
                </ul>
            </section>

            <section className="mb-8 space-y-4">
                <h2 className="text-2xl font-semibold">Disclaimers</h2>
                <h3 className="text-xl font-medium">"As Is" Service</h3>
                <p>THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO:</p>
                <ul className="list-disc pl-6 space-y-2">
                    <li>Warranties of merchantability, fitness for a particular purpose, or non-infringement</li>
                    <li>Guarantees of uninterrupted, secure, or error-free service</li>
                    <li>Accuracy, reliability, or completeness of content from TMDB</li>
                </ul>

                <h3 className="text-xl font-medium mt-6">No Professional Advice</h3>
                <p>The Service is for entertainment and personal tracking purposes only. It does not provide professional advice of any kind.</p>
            </section>

            <section className="mb-8 space-y-4">
                <h2 className="text-2xl font-semibold">Limitation of Liability</h2>
                <p>TO THE MAXIMUM EXTENT PERMITTED BY LAW:</p>
                <ul className="list-disc pl-6 space-y-2">
                    <li>WE SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES</li>
                    <li>OUR TOTAL LIABILITY SHALL NOT EXCEED $100 OR THE AMOUNT YOU PAID US (IF ANY) IN THE PAST 12 MONTHS</li>
                    <li>WE ARE NOT LIABLE FOR DATA LOSS, SERVICE INTERRUPTIONS, OR THIRD-PARTY SERVICES</li>
                </ul>
                <p>This limitation applies even if we have been advised of the possibility of such damages.</p>
            </section>

            <section className="mb-8 space-y-4">
                <h2 className="text-2xl font-semibold">Indemnification</h2>
                <p>You agree to indemnify, defend, and hold harmless mediaTRACKER, its creators, and service providers from any claims, damages, losses, liabilities, and expenses (including legal fees) arising from:</p>
                <ul className="list-disc pl-6 space-y-2">
                    <li>Your use of the Service</li>
                    <li>Your violation of these Terms</li>
                    <li>Your violation of any third-party rights</li>
                    <li>Your violation of any applicable laws</li>
                </ul>
            </section>

            <section className="mb-8 space-y-4">
                <h2 className="text-2xl font-semibold">Service Modifications and Termination</h2>
                <h3 className="text-xl font-medium">Our Rights</h3>
                <p>We reserve the right to:</p>
                <ul className="list-disc pl-6 space-y-2">
                    <li>Modify or discontinue the Service (or any part) at any time without notice</li>
                    <li>Change these Terms at any time (we will notify you of material changes)</li>
                    <li>Refuse service to anyone for any reason</li>
                    <li>Suspend or terminate accounts that violate these Terms</li>
                </ul>

                <h3 className="text-xl font-medium mt-6">Your Rights</h3>
                <p>You may stop using the Service at any time. You may request account deletion by contacting us.</p>

                <h3 className="text-xl font-medium mt-6">Effect of Termination</h3>
                <p>Upon termination:</p>
                <ul className="list-disc pl-6 space-y-2">
                    <li>Your right to use the Service immediately ceases</li>
                    <li>We may delete your account data (after a reasonable grace period)</li>
                    <li>Provisions that should survive termination will remain in effect</li>
                </ul>
            </section>

            <section className="mb-8 space-y-4">
                <h2 className="text-2xl font-semibold">Privacy</h2>
                <p>Your use of the Service is also governed by our Privacy Policy, which is incorporated into these Terms by reference. Please review our Privacy Policy to understand our data practices.</p>
            </section>

            <section className="mb-8 space-y-4">
                <h2 className="text-2xl font-semibold">Dispute Resolution</h2>
                <h3 className="text-xl font-medium">Governing Law</h3>
                <p>These Terms are governed by the laws of [Your State/Country], without regard to conflict of law principles.</p>

                <h3 className="text-xl font-medium mt-6">Informal Resolution</h3>
                <p>Before filing a legal claim, you agree to contact us at <a href="mailto:bycarmille@gmail.com" className="text-primary hover:underline">bycarmille@gmail.com</a> to attempt to resolve the dispute informally.</p>

                <h3 className="text-xl font-medium mt-6">Class Action Waiver</h3>
                <p>You agree to resolve disputes on an individual basis and waive your right to participate in class actions or representative proceedings.</p>
            </section>

            <section className="mb-8 space-y-4">
                <h2 className="text-2xl font-semibold">General Provisions</h2>
                <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Entire Agreement:</strong> These Terms constitute the entire agreement between you and mediaTRACKER regarding the Service.</li>
                    <li><strong>Severability:</strong> If any provision of these Terms is found unenforceable, the remaining provisions will remain in full effect.</li>
                    <li><strong>No Waiver:</strong> Our failure to enforce any right or provision of these Terms shall not be considered a waiver.</li>
                    <li><strong>Assignment:</strong> You may not assign or transfer these Terms. We may assign our rights and obligations without restriction.</li>
                    <li><strong>Force Majeure:</strong> We are not liable for any failure to perform due to circumstances beyond our reasonable control.</li>
                </ul>
            </section>

            <section className="mb-8 space-y-4">
                <h2 className="text-2xl font-semibold">Contact Information</h2>
                <p>For questions about these Terms, please contact us:</p>
                <p>Email: <a href="mailto:bycarmille@gmail.com" className="text-primary hover:underline">bycarmille@gmail.com</a></p>
                <p>Website: <a href="https://media-tracker-cinema-log.vercel.app/" className="text-primary hover:underline">https://media-tracker-cinema-log.vercel.app/</a></p>
            </section>

            <section className="mb-8 space-y-4">
                <h2 className="text-2xl font-semibold">Updates to Terms</h2>
                <p>We may revise these Terms from time to time. The "Last Updated" date at the top will indicate when changes were made. Material changes will be communicated via:</p>
                <ul className="list-disc pl-6 space-y-2">
                    <li>Email notification to registered users</li>
                    <li>Prominent notice on the Service</li>
                    <li>Update notification upon next login</li>
                </ul>
                <p>Continued use of the Service after changes constitutes acceptance of the updated Terms.</p>
            </section>

            <section className="mb-8 pt-8 border-t border-border">
                <p className="text-sm text-muted-foreground">
                    By using mediaTRACKER, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service.
                </p>
            </section>
        </main>
    );
}
