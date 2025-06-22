
const ToolsShowcase = () => {
  const tools = [
    { name: 'ChatGPT', logo: '🤖' },
    { name: 'Claude', logo: '🧠' },
    { name: 'Notion AI', logo: '📝' },
    { name: 'Jasper', logo: '✨' },
    { name: 'Grammarly', logo: '✍️' },
    { name: 'Midjourney', logo: '🎨' },
    { name: 'GitHub Copilot', logo: '👨‍💻' },
    { name: 'Copy.ai', logo: '📋' }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Access AI Tools on Demand</h2>
          <p className="text-gray-600 mb-12">Popular AI subscriptions available for rent</p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-6">
          {tools.map((tool) => (
            <div key={tool.name} className="group">
              <div className="bg-gray-50 rounded-xl p-6 text-center hover:bg-purple-50 transition-colors cursor-pointer">
                <div className="text-3xl mb-3">{tool.logo}</div>
                <p className="text-sm font-medium text-gray-900 group-hover:text-purple-800">{tool.name}</p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-8">
          <p className="text-sm text-gray-500">+ Many more coming soon</p>
        </div>
      </div>
    </section>
  );
};

export default ToolsShowcase;
