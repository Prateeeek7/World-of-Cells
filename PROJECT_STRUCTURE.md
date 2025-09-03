# 📁 Project Structure Documentation

## 🏗️ Complete File Architecture

```
Anatomy copy/
├── 📄 README.md                           # Project overview and setup guide
├── 📄 PROJECT_STRUCTURE.md                # This file - detailed structure
├── 📄 package.json                        # Dependencies and npm scripts
├── 📄 package-lock.json                   # Locked dependency versions
├── 📄 tailwind.config.js                  # Tailwind CSS configuration
├── 📄 postcss.config.js                   # PostCSS configuration
├── 📄 Anatomy.pdf                         # Original anatomy reference document
│
├── 📁 public/                             # Static assets directory
│   ├── 📄 index.html                      # Main HTML template
│   ├── 🎥 85064-587646864_medium.mp4     # Background video
│   ├── 🖼️ cell-placeholder.gif            # Placeholder image
│   │
│   ├── 📁 icons/                          # Cell type icons (32 files)
│   │   ├── 🖼️ adipose-tissue.png          # Adipose tissue icon
│   │   ├── 🖼️ blood.png                   # Blood icon
│   │   ├── 🖼️ bone.png                    # Bone icon
│   │   ├── 🖼️ chest.png                   # Chest icon
│   │   ├── 🖼️ connective.png              # Connective tissue icon
│   │   ├── 🖼️ disease.png                 # Disease icon
│   │   ├── 🖼️ E1.png                      # Epithelial cell icon
│   │   ├── 🖼️ epithelial-cell.png         # Epithelial cell icon
│   │   ├── 🖼️ gastrointestinal.png        # GI tract icon
│   │   ├── 🖼️ immune.png                  # Immune system icon
│   │   ├── 🖼️ immune1.png                 # Alternative immune icon
│   │   ├── 🖼️ living-tissue.png           # Living tissue icon
│   │   ├── 🖼️ muscles.png                 # Muscular system icon
│   │   ├── 🖼️ nervous.png                 # Nervous system icon
│   │   ├── 🖼️ neuron.png                  # Neuron icon
│   │   ├── 🖼️ neurons.png                 # Multiple neurons icon
│   │   ├── 🖼️ orthopedic.png              # Orthopedic icon
│   │   ├── 🖼️ red-blood-cells.png         # Red blood cells icon
│   │   ├── 🖼️ reproductive.png            # Reproductive system icon
│   │   ├── 🖼️ secretory.png               # Secretory system icon
│   │   ├── 🖼️ skeletal.png                # Skeletal system icon
│   │   ├── 🖼️ skeleton.png                # Skeleton icon
│   │   ├── 🖼️ stem-cells.png              # Stem cells icon
│   │   ├── 🖼️ stem.png                    # Stem cell icon
│   │   ├── 🖼️ strength.png                # Strength/muscle icon
│   │   ├── 🖼️ thoracic.png                # Thoracic region icon
│   │   └── 🖼️ thyroid.png                 # Thyroid icon
│   │
│   └── 📁 images/                         # Cell microscopy images (80+ files)
│       ├── 🖼️ Alveolar_type_I_cell.png   # Alveolar type I cell image
│       ├── 🖼️ Ameloblast.jpg             # Ameloblast cell image
│       ├── 🖼️ apocrine_sweat_glands.jpg  # Apocrine sweat gland image
│       ├── 🖼️ ASG.jpg                     # Apocrine sweat gland image
│       ├── 🖼️ Cardiac_muscle_cell.jpg    # Cardiac muscle cell image
│       ├── 🖼️ Cardiac_pacemaker_cell.png # Cardiac pacemaker cell image
│       ├── 🖼️ Cardiomyocyte.png           # Cardiomyocyte image
│       ├── 🖼️ Cementoblast.jpg           # Cementoblast image
│       ├── 🖼️ Chief_cell.png              # Chief cell image
│       ├── 🖼️ Cholangiocyte.jpg          # Cholangiocyte image
│       ├── 🖼️ Ciliated_airway_cell.png   # Ciliated airway cell image
│       ├── 🖼️ Club_cell.jpg              # Club cell image
│       ├── 🖼️ Collecting_duct_principal_cell.jpg # Collecting duct cell image
│       ├── 🖼️ Corneal_endothelial_cell.jpeg # Corneal endothelial cell image
│       ├── 🖼️ Corneal_endothelial_cell.jpg # Corneal endothelial cell image
│       ├── 🖼️ Corneal_epithelial_cell.png # Corneal epithelial cell image
│       ├── 🖼️ Corneal_fibroblast.png     # Corneal fibroblast image
│       ├── 🖼️ Corneal_stromal_cell.jpg   # Corneal stromal cell image
│       ├── 🖼️ Cortical_hair_shaft_cell.jpg # Cortical hair shaft cell image
│       ├── 🖼️ Cuticular_hair_root_sheath_cell.jpg # Cuticular hair root sheath cell image
│       ├── 🖼️ Cuticular_hair_shaft_cell.jpg # Cuticular hair shaft cell image
│       ├── 🖼️ Eccrine_gland_duct_cell.jpg # Eccrine gland duct cell image
│       ├── 🖼️ Enterocyte.png             # Enterocyte image
│       ├── 🖼️ Enteroendocrine_cell.jpg_large # Enteroendocrine cell image
│       ├── 🖼️ Gallbladder_epithelial_cell.png # Gallbladder epithelial cell image
│       ├── 🖼️ Goblet_cell.png            # Goblet cell image
│       ├── 🖼️ Hair_shaft_cell.png        # Hair shaft cell image
│       ├── 🖼️ Henles_layer_hair_root_sheath_cell.jpg # Henle's layer cell image
│       ├── 🖼️ Huxleys_layer_hair_root_sheath_cell.jpg # Huxley's layer cell image
│       ├── 🖼️ Inner_root_sheath_cell.jpg # Inner root sheath cell image
│       ├── 🖼️ Intercalated_cell_kidney.jpg # Intercalated kidney cell image
│       ├── 🖼️ Intestinal_stem_cell.jpg   # Intestinal stem cell image
│       ├── 🖼️ Keratinocytes.png          # Keratinocytes image
│       ├── 🖼️ Kidney_distal_tubule_cell.png # Kidney distal tubule cell image
│       ├── 🖼️ Kidney_proximal_tubule_cell.png # Kidney proximal tubule cell image
│       ├── 🖼️ Langerhans_cell.png        # Langerhans cell image
│       ├── 🖼️ learn-more-cell.png        # Learn more cell image
│       ├── 🖼️ Lens_epithelial_cell.jpg   # Lens epithelial cell image
│       ├── 🖼️ Lens_fiber_cell.jpg        # Lens fiber cell image
│       ├── 🖼️ logo.png                   # Project logo
│       ├── 🖼️ m_cell.png                 # M cell image
│       ├── 🖼️ Matrix_hair_follicle_cell.jpg # Matrix hair follicle cell image
│       ├── 🖼️ Medullary_hair_shaft_cell.jpg # Medullary hair shaft cell image
│       ├── 🖼️ Merkel_cell.png            # Merkel cell image
│       ├── 🖼️ Mesothelial_cell.png       # Mesothelial cell image
│       ├── 🖼️ myoblast.png               # Myoblast image
│       ├── 🖼️ myocyte.jpg                # Myocyte image
│       ├── 🖼️ Myofibroblast.png          # Myofibroblast image
│       ├── 🖼️ Myosatellite.jpg           # Myosatellite cell image
│       ├── 🖼️ Nail_bed_basal_cell.png   # Nail bed basal cell image
│       ├── 🖼️ Odontoblast.jpg            # Odontoblast image
│       ├── 🖼️ Olfactory_sustentacular_cell.jpg # Olfactory sustentacular cell image
│       ├── 🖼️ Oral_keratinocyte.png      # Oral keratinocyte image
│       ├── 🖼️ Paneth_cell.png            # Paneth cell image
│       ├── 🖼️ Parietal_cell.png          # Parietal cell image
│       ├── 🖼️ Pericytes.jpg              # Pericytes image
│       ├── 🖼️ Periodontal_ligament_cell.jpg # Periodontal ligament cell image
│       ├── 🖼️ Pulmonary_neuroendocrine_cell.jpg # Pulmonary neuroendocrine cell image
│       ├── 🖼️ Purkinje_fiber.jpeg        # Purkinje fiber image
│       ├── 🖼️ Respiratory_epithelial_cell.jpg # Respiratory epithelial cell image
│       ├── 🖼️ Retinal_pigment_epithelium_cell.png # RPE cell image
│       ├── 🖼️ Rhabdomyoblast.png         # Rhabdomyoblast image
│       ├── 🖼️ Rhabdomyoblast.webp        # Rhabdomyoblast image (WebP)
│       ├── 🖼️ Salivary_gland_acinar_cell.jpg # Salivary gland acinar cell image
│       ├── 🖼️ Salivary_gland_duct_cell.jpg # Salivary gland duct cell image
│       ├── 🖼️ Sebocyte                   # Sebocyte image
│       ├── 🖼️ Sebocyte.png               # Sebocyte image
│       ├── 🖼️ Skeletal_muscle_white_cell.png # Skeletal muscle white cell image
│       ├── 🖼️ SM_iris.png                # Smooth muscle iris image
│       ├── 🖼️ SM_Vascular.jpg            # Vascular smooth muscle image
│       ├── 🖼️ SM_visceral.jpg            # Visceral smooth muscle image
│       ├── 🖼️ Smooth_Muscle.jpg          # Smooth muscle image
│       ├── 🖼️ Syncytiotrophoblast.jpg    # Syncytiotrophoblast image
│       ├── 🖼️ Taste_bud_cell.jpg         # Taste bud cell image
│       ├── 🖼️ Urinary_epithelium_cell.png # Urinary epithelium cell image
│       └── 🖼️ Urothelial_cell.jpg        # Urothelial cell image
│
├── 📁 src/                                # Source code directory
│   ├── 📄 App.jsx                         # Main application component
│   ├── 📄 index.js                        # Application entry point
│   ├── 📄 index.css                       # Global CSS styles
│   │
│   ├── 📁 components/                     # Reusable UI components
│   │   ├── 📄 PerformanceMonitor.jsx      # Performance monitoring component
│   │   └── 📄 ThemeToggle.jsx             # Theme switching component
│   │
│   ├── 📁 contexts/                       # React context providers
│   │   └── 📄 ThemeContext.js             # Theme management context
│   │
│   ├── 📁 data/                           # Data and configuration files
│   │   └── 📄 cells.json                  # Cell database with references
│   │
│   ├── 📁 hooks/                          # Custom React hooks
│   │   └── 📄 useResponsive.js            # Responsive design hook
│   │
│   └── 📁 pages/                          # Page components
│       ├── 📄 Home.jsx                    # Main landing page
│       ├── 📄 GroupPage.jsx               # Cell group listing page
│       ├── 📄 CellPage.jsx                # Individual cell detail page
│       └── 📄 HumanCellIntro.jsx          # Human cell introduction page
│
└── 📁 node_modules/                       # Dependencies (auto-generated)
    └── ...                                # All installed packages
```

## 🔍 File Purpose & Functionality

### **Root Configuration Files**

| File | Purpose | Key Features |
|------|---------|--------------|
| `README.md` | Project documentation | Setup guide, features, usage instructions |
| `PROJECT_STRUCTURE.md` | Codebase organization | File structure, component relationships |
| `package.json` | Dependencies & scripts | React, Tailwind, build tools configuration |
| `tailwind.config.js` | CSS framework config | Custom colors, responsive breakpoints |
| `postcss.config.js` | CSS processing | Autoprefixer, Tailwind processing |

### **Public Assets**

| Directory | Purpose | Contents |
|-----------|---------|----------|
| `public/icons/` | Cell type icons | 32 PNG icons for different tissue systems |
| `public/images/` | Cell microscopy images | 80+ high-quality cell images |
| `public/index.html` | HTML template | React app mounting point |

### **Source Code Structure**

#### **Core Application Files**
- **`App.jsx`**: Main app component with routing and theme provider
- **`index.js`**: Application entry point and React rendering
- **`index.css`**: Global styles and Tailwind imports

#### **Component Architecture**
- **`components/`**: Reusable UI components
  - `PerformanceMonitor.jsx`: Real-time performance metrics
  - `ThemeToggle.jsx`: Dark/light mode switching

#### **State Management**
- **`contexts/`**: React context providers
  - `ThemeContext.js`: Theme state and persistence

#### **Custom Hooks**
- **`hooks/`**: Reusable logic
  - `useResponsive.js`: Device-specific responsive logic

#### **Data Layer**
- **`data/`**: Application data
  - `cells.json`: Comprehensive cell database with research references

#### **Page Components**
- **`pages/`**: Route-specific components
  - `Home.jsx`: Landing page with search and navigation
  - `GroupPage.jsx`: Cell group listings
  - `CellPage.jsx`: Individual cell details with references
  - `HumanCellIntro.jsx`: Educational content

## 🔗 Component Relationships

### **Data Flow Architecture**
```
cells.json → CellPage.jsx → References Section → Research Links
     ↓
Home.jsx → Search → GroupPage.jsx → CellPage.jsx
     ↓
ThemeContext → ThemeToggle → All Components
```

### **Component Hierarchy**
```
App.jsx (Root)
├── ThemeProvider
├── PerformanceMonitor
└── Routes
    ├── Home.jsx
    ├── GroupPage.jsx
    ├── CellPage.jsx
    └── HumanCellIntro.jsx
```

### **Hook Usage Patterns**
- **`useTheme`**: Used in all components for theme-aware styling
- **`useResponsive`**: Used in Home.jsx for logo positioning
- **`useDebounce`**: Used in Home.jsx for search optimization
- **`useMemo/useCallback`**: Used throughout for performance optimization

## 📊 Data Structure

### **Cell Database Schema**
```json
{
  "name": "Cell Name",
  "group": "Tissue Type",
  "icon": "/icons/icon.png",
  "image": "/images/cell_image.png",
  "embryonic_origin": "Developmental origin",
  "discovery": {
    "scientist": "Discoverer name",
    "year": "Discovery year",
    "stain": "Staining method"
  },
  "location": "Anatomical location",
  "function": "Cellular function description",
  "life_span": "Cell lifespan",
  "adherent": "Adhesion properties",
  "effect_of_ageing": "Age-related changes",
  "related_disease": "Associated diseases",
  "history_of_evolution": "Evolutionary history",
  "relevance_to_tissue_development": "Development role",
  "tissue_engineering_research": "Research applications",
  "references": [
    {
      "title": "Research paper title",
      "source": "Journal name",
      "year": "Publication year",
      "type": "Article type",
      "url": "Publication URL"
    }
  ]
}
```

## 🚀 Performance Optimizations

### **React Optimizations**
- **Code Splitting**: Route-based lazy loading
- **Memoization**: React.memo, useMemo, useCallback
- **Debounced Search**: Optimized search performance
- **Custom Hooks**: Centralized responsive logic

### **Build Optimizations**
- **Tailwind Purge**: Remove unused CSS in production
- **Code Splitting**: Reduce initial bundle size
- **Lazy Loading**: Load components on demand

## 🎨 Styling Architecture

### **CSS Framework**
- **Tailwind CSS**: Utility-first CSS framework
- **Custom Components**: Reusable styled components
- **Theme System**: Dark/light mode support
- **Responsive Design**: Mobile-first approach

### **Design System**
- **Color Palette**: Consistent color scheme
- **Typography**: Readable font hierarchy
- **Spacing**: Consistent spacing scale
- **Components**: Unified component design

## 🔧 Development Workflow

### **File Organization Principles**
1. **Separation of Concerns**: Logic, UI, and data separated
2. **Component Reusability**: Shared components in components/
3. **Custom Hooks**: Reusable logic in hooks/
4. **Context Providers**: State management in contexts/
5. **Page Components**: Route-specific components in pages/

### **Naming Conventions**
- **Components**: PascalCase (e.g., `CellPage.jsx`)
- **Hooks**: camelCase with `use` prefix (e.g., `useResponsive.js`)
- **Contexts**: PascalCase with `Context` suffix (e.g., `ThemeContext.js`)
- **Files**: Descriptive names reflecting purpose

### **Import Structure**
```javascript
// External libraries
import React from 'react';
import { BrowserRouter } from 'react-router-dom';

// Internal components
import Home from './pages/Home';
import ThemeProvider from './contexts/ThemeContext';

// Custom hooks
import { useTheme } from './contexts/ThemeContext';
import { useResponsive } from './hooks/useResponsive';

// Data
import cellData from './data/cells.json';
```

## 📱 Responsive Design Strategy

### **Breakpoint System**
- **Mobile**: < 640px (default)
- **Small**: 640px - 768px
- **Medium**: 768px - 1024px
- **Large**: 1024px - 1280px
- **XL**: > 1280px

### **Component Adaptations**
- **Logo Positioning**: Responsive logo placement
- **Search Results**: Mobile-optimized dropdown
- **Navigation**: Adaptive navigation patterns
- **Content Layout**: Flexible content grids

## 🔍 Search & Navigation

### **Search Implementation**
- **Real-time Search**: Instant results as you type
- **Debounced Input**: Optimized performance
- **Dropdown Results**: Compact search results
- **Fuzzy Matching**: Flexible search algorithms

### **Navigation Structure**
- **Home**: Landing page with search and groups
- **Groups**: Tissue type categories
- **Cells**: Individual cell details
- **Intro**: Educational content

## 🎯 Future Development

### **Planned Features**
- **Advanced Search**: Filters and sorting options
- **User Accounts**: Personalized research collections
- **Mobile App**: Native mobile application
- **API Integration**: External research databases

### **Scalability Considerations**
- **Database**: Move from JSON to proper database
- **Caching**: Implement search result caching
- **CDN**: Image and asset optimization
- **PWA**: Progressive web app features

---

*This structure documentation provides a comprehensive overview of the project organization, helping developers understand the codebase architecture and contribute effectively.*
