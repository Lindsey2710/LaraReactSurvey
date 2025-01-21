import PageComponent from "../components/PageComponent";

export default function Info() {
  return (
    <PageComponent title="How It Works">
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-indigo-200 via-purple-100 to-blue-100" />
      
      <div className="max-w-4xl mx-auto">
        <div className="bg-white/90 backdrop-blur-sm p-8 rounded-xl shadow-lg">
          <div className="space-y-8">
            {/* Dashboard Section */}
            <div>
              <h2 className="text-2xl font-bold text-indigo-600 mb-4">Dashboard</h2>
              <div className="text-gray-600 space-y-2">
                <p>The Dashboard provides an overview of your survey activities:</p>
                <ul className="list-disc ml-6 space-y-2">
                  <li>View total number of surveys created</li>
                  <li>See total responses received</li>
                  <li>Quick access to your latest survey</li>
                  <li>Monitor survey statistics in real-time</li>
                </ul>
              </div>
            </div>

            {/* Surveys Section */}
            <div>
              <h2 className="text-2xl font-bold text-indigo-600 mb-4">Surveys</h2>
              <div className="text-gray-600 space-y-2">
                <p>Manage all your surveys in one place:</p>
                <ul className="list-disc ml-6 space-y-2">
                  <li>Create new surveys with custom questions</li>
                  <li>Edit existing surveys</li>
                  <li>View survey responses</li>
                  <li>Share surveys with others</li>
                  <li>Delete surveys you no longer need</li>
                </ul>
              </div>
            </div>

            {/* Getting Started */}
            <div>
              <h2 className="text-2xl font-bold text-indigo-600 mb-4">Getting Started</h2>
              <div className="text-gray-600 space-y-2">
                <p>Follow these steps to create your first survey:</p>
                <ol className="list-decimal ml-6 space-y-2">
                  <li>Click on "Surveys" in the navigation</li>
                  <li>Click the "Create new" button</li>
                  <li>Fill in your survey details and questions</li>
                  <li>Save and share your survey link</li>
                  <li>Monitor responses in real-time</li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageComponent>
  );
} 