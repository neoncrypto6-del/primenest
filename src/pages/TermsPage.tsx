import React from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
export function TermsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />

      <main className="flex-grow">
        <div className="bg-blue-600 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Terms of Service
            </h1>
            <p className="text-xl text-blue-100">
              Last updated: January 1, 2024
            </p>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="prose prose-lg max-w-none">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              1. Acceptance of Terms
            </h2>
            <p className="text-gray-600 mb-6">
              By accessing and using PrimeNest's website and services, you
              accept and agree to be bound by these Terms of Service. If you do
              not agree to these terms, please do not use our services.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              2. Description of Services
            </h2>
            <p className="text-gray-600 mb-6">
              PrimeNest provides an online platform for browsing real estate
              listings including houses, apartments, land, and office spaces for
              sale and rent across the United States. We act as an intermediary
              connecting property seekers with available listings.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              3. User Responsibilities
            </h2>
            <p className="text-gray-600 mb-4">
              As a user of our services, you agree to:
            </p>
            <ul className="list-disc pl-6 text-gray-600 mb-6 space-y-2">
              <li>
                Provide accurate and complete information when using our
                services
              </li>
              <li>Use our services only for lawful purposes</li>
              <li>Not attempt to gain unauthorized access to our systems</li>
              <li>Not use our services to harass, abuse, or harm others</li>
              <li>
                Not reproduce, duplicate, or exploit any portion of our services
                without permission
              </li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              4. Property Listings
            </h2>
            <p className="text-gray-600 mb-6">
              While we strive to ensure the accuracy of all property listings,
              PrimeNest does not guarantee the accuracy, completeness, or
              reliability of any listing information. Users should independently
              verify all property details before making any decisions. Listing
              prices, availability, and features are subject to change without
              notice.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              5. No Broker Fees
            </h2>
            <p className="text-gray-600 mb-6">
              PrimeNest does not charge broker fees to users browsing our
              listings. However, individual property transactions may involve
              fees charged by third parties such as property owners, management
              companies, or legal services. Users are responsible for
              understanding all costs associated with any property transaction.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              6. Intellectual Property
            </h2>
            <p className="text-gray-600 mb-6">
              All content on our website, including text, graphics, logos,
              images, and software, is the property of PrimeNest or its content
              suppliers and is protected by intellectual property laws. You may
              not use, reproduce, or distribute any content without our prior
              written permission.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              7. Limitation of Liability
            </h2>
            <p className="text-gray-600 mb-6">
              PrimeNest shall not be liable for any indirect, incidental,
              special, consequential, or punitive damages resulting from your
              use of or inability to use our services. This includes damages for
              loss of profits, data, or other intangible losses, even if we have
              been advised of the possibility of such damages.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              8. Disclaimer of Warranties
            </h2>
            <p className="text-gray-600 mb-6">
              Our services are provided "as is" and "as available" without any
              warranties of any kind, either express or implied. We do not
              warrant that our services will be uninterrupted, secure, or
              error-free.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              9. Third-Party Links
            </h2>
            <p className="text-gray-600 mb-6">
              Our website may contain links to third-party websites or services.
              We are not responsible for the content, privacy policies, or
              practices of any third-party sites. You access such sites at your
              own risk.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              10. Indemnification
            </h2>
            <p className="text-gray-600 mb-6">
              You agree to indemnify and hold harmless PrimeNest, its officers,
              directors, employees, and agents from any claims, damages, losses,
              or expenses arising from your use of our services or violation of
              these terms.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              11. Modifications to Terms
            </h2>
            <p className="text-gray-600 mb-6">
              We reserve the right to modify these Terms of Service at any time.
              Changes will be effective immediately upon posting on our website.
              Your continued use of our services after any changes constitutes
              acceptance of the new terms.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              12. Governing Law
            </h2>
            <p className="text-gray-600 mb-6">
              These Terms of Service shall be governed by and construed in
              accordance with the laws of the State of New York, without regard
              to its conflict of law provisions.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              13. Contact Information
            </h2>
            <p className="text-gray-600 mb-6">
              For questions about these Terms of Service, please contact us at:
            </p>
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
              <p className="text-gray-700">
                <strong>PrimeNest</strong>
                <br />
                123 Real Estate Blvd
                <br />
                New York, NY 10001
                <br />
                Email: legal@primenest.com
                <br />
                Phone: 1-800-PRIMENEST
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>);

}