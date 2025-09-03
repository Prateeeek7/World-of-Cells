# 🧬 World of Cells - Interactive Human Cell Atlas

<div align="center">
  <img src="public/images/logo.png" alt="World of Cells Logo" width="200" height="200">
  <br>
  <em>A comprehensive, interactive web application exploring the fascinating world of human cells through detailed information, research references, and modern web technologies.</em>
</div>

---

## ✨ Features

### 🔍 **Interactive Cell Exploration**
- **Comprehensive Cell Database**: 200+ human cell types with detailed information
- **Smart Search**: Real-time search with dropdown results for quick navigation
- **Cell Grouping**: Organized by tissue types (Epithelial, Muscular, Nervous, etc.)
- **Detailed Cell Pages**: Individual pages for each cell with comprehensive data

### 📚 **Rich Content & Research**
- **Embryonic Origin**: Developmental biology information for each cell
- **Discovery Details**: Historical context with scientist names and years
- **Function & Location**: Detailed cellular functions and anatomical locations
- **Disease Associations**: Related medical conditions and pathologies
- **Research References**: Curated research papers, articles, and conference materials
- **Tissue Engineering**: Current research applications and regenerative medicine

### 🎨 **Modern User Experience**
- **Responsive Design**: Optimized for all devices (mobile, tablet, desktop)
- **Dark/Light Mode**: Toggle between themes for comfortable viewing
- **Performance Optimized**: React optimizations, code splitting, and lazy loading
- **Accessibility**: Screen reader friendly with proper semantic markup

### 🚀 **Technical Excellence**
- **React 18**: Modern React with hooks and functional components
- **Performance Monitoring**: Real-time FPS, memory, and load time tracking
- **Code Splitting**: Route-based lazy loading for optimal performance
- **Tailwind CSS**: Utility-first CSS framework for consistent design
- **Responsive Hooks**: Custom hooks for device-specific functionality

## 🏗️ Project Structure

```
Anatomy copy/
├── public/                    # Static assets
│   ├── images/               # Cell microscopy images
│   ├── icons/                # Cell type icons
│   └── index.html            # Main HTML file
├── src/                      # Source code
│   ├── components/           # Reusable components
│   │   ├── PerformanceMonitor.jsx
│   │   └── ThemeToggle.jsx
│   ├── contexts/             # React contexts
│   │   └── ThemeContext.js
│   ├── data/                 # Data files
│   │   └── cells.json        # Cell database
│   ├── hooks/                # Custom hooks
│   │   └── useResponsive.js
│   ├── pages/                # Page components
│   │   ├── Home.jsx          # Main landing page
│   │   ├── GroupPage.jsx     # Cell group pages
│   │   ├── CellPage.jsx      # Individual cell pages
│   │   └── HumanCellIntro.jsx
│   ├── App.jsx               # Main app component
│   ├── index.js              # Entry point
│   └── index.css             # Global styles
├── package.json              # Dependencies and scripts
├── tailwind.config.js        # Tailwind configuration
└── README.md                 # This file
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd "Anatomy copy"
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

### Build for Production

```bash
npm run build
```

The optimized build will be created in the `build/` directory.

## 📱 Usage

### **Homepage Navigation**
- **Search Bar**: Type any cell name for instant results
- **Cell Groups**: Click on tissue type categories
- **Human Cell Intro**: Learn about cell biology basics
- **Theme Toggle**: Switch between light and dark modes

### **Exploring Cells**
1. **Search**: Use the search bar to find specific cells
2. **Browse Groups**: Navigate through tissue type categories
3. **Cell Details**: Click on any cell to view comprehensive information
4. **Research Links**: Access curated research references for each cell
5. **Further Learning**: Use "Want to Learn More?" buttons for additional research

### **Research References**
Each cell page includes:
- **Curated Research Links**: Hand-picked papers and articles
- **PubMed Search**: Direct links to scientific literature
- **Web Search**: Broader research on specific cell types
- **Cell Group Navigation**: Related cell type exploration

## 🧪 Performance Features

### **Optimization Techniques**
- **React.memo()**: Prevents unnecessary re-renders
- **useCallback**: Memoized event handlers
- **useMemo**: Cached expensive calculations
- **Code Splitting**: Lazy-loaded route components
- **Debounced Search**: Optimized search performance

### **Performance Monitoring**
- **FPS Tracking**: Real-time frame rate monitoring
- **Memory Usage**: Current memory consumption
- **Load Times**: Page performance metrics
- **Development Only**: Automatically hidden in production

## 🎨 Customization

### **Adding New Cells**
1. Edit `src/data/cells.json`
2. Add new cell entry with required fields
3. Include relevant research references
4. Add corresponding images to `public/images/`

### **Modifying References**
Each cell can have custom research references:
```json
{
  "name": "Cell Name",
  "references": [
    {
      "title": "Research Paper Title",
      "source": "Journal Name",
      "year": "2023",
      "type": "Research Article",
      "url": "https://example.com/paper"
    }
  ]
}
```

### **Theme Customization**
- Modify `src/contexts/ThemeContext.js` for theme logic
- Update `tailwind.config.js` for color schemes
- Customize component themes in individual files

## 🔧 Technical Details

### **Key Technologies**
- **Frontend**: React 18, React Router v6
- **Styling**: Tailwind CSS, CSS-in-JS
- **State Management**: React Context API, Local Storage
- **Build Tool**: Create React App
- **Performance**: React DevTools, Custom monitoring

### **Browser Support**
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

### **Performance Targets**
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1
- **First Input Delay**: < 100ms

## 🤝 Contributing

### **Development Guidelines**
1. **Code Style**: Follow existing React patterns
2. **Performance**: Use React optimization techniques
3. **Accessibility**: Maintain screen reader compatibility
4. **Testing**: Test on multiple devices and browsers
5. **Documentation**: Update README for new features

### **Adding Features**
1. **Research**: Ensure scientific accuracy
2. **Design**: Maintain consistent UI/UX
3. **Performance**: Optimize for speed and efficiency
4. **Accessibility**: Include proper ARIA labels
5. **Documentation**: Update relevant documentation

## 📚 Data Sources

### **Cell Information**
- **Scientific Literature**: Peer-reviewed research papers
- **Medical Databases**: PubMed, ScienceDirect, Nature
- **Textbooks**: Standard anatomy and cell biology references
- **Expert Review**: Validated by scientific community

### **Research References**
- **Recent Publications**: 2022-2023 research papers
- **High-Impact Journals**: Nature, Science, Cell, etc.
- **Clinical Studies**: Medical research and clinical trials
- **Review Articles**: Comprehensive scientific summaries

## 🚨 Troubleshooting

### **Common Issues**

**Search not working**
- Check browser console for errors
- Ensure all dependencies are installed
- Verify `cells.json` file integrity

**Images not loading**
- Check image file paths in `public/images/`
- Verify file permissions
- Ensure image files exist

**Performance issues**
- Check Performance Monitor for metrics
- Verify code splitting is working
- Monitor memory usage in DevTools

### **Development Issues**

**Hot reload not working**
- Restart development server
- Clear browser cache
- Check file watcher limits

**Build errors**
- Verify Node.js version compatibility
- Clear `node_modules` and reinstall
- Check for syntax errors in source files

## 📄 License

This project is for educational and research purposes. All cell information and research references are sourced from publicly available scientific literature.

## 🙏 Acknowledgments

- **Scientific Community**: Researchers and scientists whose work is referenced
- **Medical Professionals**: Healthcare workers who provided clinical insights
- **Open Source**: React, Tailwind CSS, and other open-source technologies
- **Educational Institutions**: Universities and research centers

## 📞 Support

For questions, issues, or contributions:
- **Issues**: Create a GitHub issue
- **Documentation**: Check this README and code comments
- **Community**: Join our discussion forum

---

**Made with ❤️ for science education and research - Pratik Kumar**

*Last updated: December 2025*
