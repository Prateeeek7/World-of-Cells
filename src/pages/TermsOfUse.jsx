import React from 'react';
import { useTheme } from '../contexts/ThemeContext';

const TermsOfUse = () => {
  const { isDarkMode } = useTheme();

  return (
    <div className={`min-h-screen py-8 px-4 sm:px-6 lg:px-8 ${
      isDarkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'
    }`}>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">
            Terms of Use
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Last Updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>

        {/* Content */}
        <div className={`prose prose-lg max-w-none ${
          isDarkMode ? 'prose-invert' : ''
        }`}>
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Welcome to World of Cells</h2>
            <p className="mb-4">
              Please read these terms of use ("terms of use", "agreement") carefully before using the World of Cells website ("website", "service"). By accessing or using this website, you agree to be bound by these terms and conditions.
            </p>
            <p className="mb-4">
              World of Cells is an educational platform dedicated to providing comprehensive information about cell biology, anatomy, and human physiology. Our service includes interactive cell exploration, comparison tools, research timelines, and AI-powered educational assistance.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Conditions of Use</h2>
            <p className="mb-4">
              By using this website, you certify that you have read and reviewed this agreement and that you agree to comply with its terms. If you do not want to be bound by the terms of this agreement, you are advised to leave the website accordingly.
            </p>
            <p className="mb-4">
              We reserve the right, at our discretion, to modify, add or delete portions of these terms of use at any time by posting updated terms of use on this site. Please check these terms of use frequently for updates. Any modifications, additions or deletions to these terms of use shall be effective immediately upon posting of updated terms of use.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Privacy Policy</h2>
            <p className="mb-4">
              Your privacy is important to us. We collect minimal user data to improve your experience on our platform. We do not share your personal information with third parties without your consent. For more detailed information about our data practices, please review our privacy policy.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Age Restriction</h2>
            <p className="mb-4">
              You must be at least 13 (thirteen) years of age to use this website. By using this website, you warrant that you are at least 13 years of age and you may legally adhere to this Agreement. We assume no responsibility for liabilities related to age misrepresentation.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Intellectual Property</h2>
            <p className="mb-4">
              The content on World of Cells, including but not limited to text, graphics, images, interactive tools, and educational materials, is protected by copyright and other intellectual property laws. The website and its entire contents, features, and functionality are owned by World of Cells or its licensors.
            </p>
            <p className="mb-4">
              You may use the website and its content for educational and personal purposes only. You must not:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>Reproduce, distribute, or modify any content without permission</li>
              <li>Use the content for commercial purposes</li>
              <li>Remove any copyright or proprietary notices</li>
              <li>Create derivative works without authorization</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Educational Content Disclaimer</h2>
            <p className="mb-4">
              The information provided on World of Cells is for educational purposes only and should not be used as a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of qualified health providers with questions about medical conditions.
            </p>
            <p className="mb-4">
              While we strive to provide accurate and up-to-date information, we make no guarantees about the completeness, accuracy, or timeliness of the content. The field of cell biology and medicine is constantly evolving, and information may become outdated.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Sources and References</h2>
            <p className="mb-4">
              All information presented on this website has been compiled from multiple authoritative sources including:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>Peer-reviewed scientific research papers and studies</li>
              <li>Academic textbooks and educational materials</li>
              <li>Medical and scientific journals</li>
              <li>Established medical and biological reference works</li>
              <li>Reputable educational institutions and organizations</li>
              <li>Professional medical and scientific databases</li>
            </ul>
            <p className="mb-4">
              We have made every effort to ensure that the information presented is accurate and current at the time of publication. However, we acknowledge that scientific knowledge is continuously evolving, and new discoveries may supersede previously accepted information.
            </p>
            <p className="mb-4">
              While we strive to cite and reference our sources appropriately, the educational nature of this platform means that not every piece of information may include direct citations. Users are encouraged to consult original sources and current literature for detailed research and verification.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">User Accounts and Contributions</h2>
            <p className="mb-4">
              Some features of our website may require you to create an account. You are responsible for maintaining the security of your account information and for all activities that occur under your account.
            </p>
            <p className="mb-4">
              If you contribute content to our platform (such as feedback, suggestions, or educational content), you grant us a non-exclusive license to use, modify, and display your contributions for educational purposes.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Prohibited Uses</h2>
            <p className="mb-4">You may not use our website:</p>
            <ul className="list-disc pl-6 mb-4">
              <li>For any unlawful purpose or to solicit others to perform unlawful acts</li>
              <li>To violate any international, federal, provincial, or state regulations, rules, laws, or local ordinances</li>
              <li>To infringe upon or violate our intellectual property rights or the intellectual property rights of others</li>
              <li>To harass, abuse, insult, harm, defame, slander, disparage, intimidate, or discriminate</li>
              <li>To submit false or misleading information</li>
              <li>To upload or transmit viruses or any other type of malicious code</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Limitation of Liability</h2>
            <p className="mb-4">
              In no event shall World of Cells, its directors, employees, partners, agents, suppliers, or affiliates be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your use of the service.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Contact Information</h2>
            <p className="mb-4">
              If you have any questions about these Terms of Use, please contact us at:
            </p>
            <div className={`p-4 rounded-lg ${
              isDarkMode ? 'bg-gray-800' : 'bg-gray-100'
            }`}>
              <p><strong>Email:</strong> pratik2002singh@gmail.com</p>
              <p><strong>GitHub:</strong> <a href="https://github.com/Prateeeek7" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">github.com/Prateeeek7</a></p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Governing Law</h2>
            <p className="mb-4">
              These Terms of Use shall be interpreted and governed by the laws of the jurisdiction in which World of Cells operates, without regard to its conflict of law provisions.
            </p>
          </section>

          <div className="text-center mt-12 pt-8 border-t border-gray-300 dark:border-gray-700">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              By using World of Cells, you acknowledge that you have read and understood these Terms of Use and agree to be bound by them.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsOfUse;
