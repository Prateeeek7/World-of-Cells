import React, { useMemo, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { useEffect } from "react";
import { useTheme } from "../contexts/ThemeContext";

// Move large data objects outside component to prevent recreation on every render
const cellGroupTypes = {
  "epithelial": [
    { name: "Keratinocytes", icon: "/icons/E1.png" },
    { name: "Merkel cell", icon: "/icons/E1.png" },
    { name: "Langerhans cell (skin)", icon: "/icons/E1.png" },
    { name: "Hair shaft cell", icon: "/icons/E1.png" },
    { name: "Nail bed basal cell", icon: "/icons/E1.png" },
    { name: "Corneal epithelial cell", icon: "/icons/E1.png" },
    { name: "Goblet cell", icon: "/icons/E1.png" },
    { name: "Enterocyte", icon: "/icons/E1.png" },
    { name: "Paneth cell", icon: "/icons/E1.png" },
    { name: "Parietal cell (stomach)", icon: "/icons/E1.png" },
    { name: "Chief cell (stomach)", icon: "/icons/E1.png" },
    { name: "Gallbladder epithelial cell", icon: "/icons/E1.png" },
    { name: "Kidney proximal tubule cell", icon: "/icons/E1.png" },
    { name: "Kidney distal tubule cell", icon: "/icons/E1.png" },
    { name: "Urinary bladder epithelial cell", icon: "/icons/E1.png" },
    { name: "Mesothelial cell", icon: "/icons/E1.png" },
    { name: "Alveolar type I cell", icon: "/icons/E1.png" },
    { name: "Alveolar type II cell", icon: "/icons/E1.png" },
    { name: "Ciliated airway cell", icon: "/icons/E1.png" },
    { name: "Club cell", icon: "/icons/E1.png" },
    { name: "Hepatocyte", icon: "/icons/E1.png" },
    { name: "Cholangiocyte", icon: "/icons/E1.png" },
    { name: "Collecting duct principal cell", icon: "/icons/E1.png" },
    { name: "Intercalated cell (kidney)", icon: "/icons/E1.png" },
    { name: "Oral keratinocyte", icon: "/icons/E1.png" },
    { name: "Salivary gland acinar cell", icon: "/icons/E1.png" },
    { name: "Salivary gland duct cell", icon: "/icons/E1.png" },
    { name: "Urothelial cell", icon: "/icons/E1.png" },
    { name: "Syncytiotrophoblast", icon: "/icons/E1.png" },
    { name: "Medullary hair shaft cell", icon: "/icons/E1.png" },
    { name: "Cortical hair shaft cell", icon: "/icons/E1.png" },
    { name: "Cuticular hair shaft cell", icon: "/icons/E1.png" },
    { name: "Cuticular hair root sheath cell", icon: "/icons/E1.png" },
    { name: "Huxley's layer hair root sheath cell", icon: "/icons/E1.png" },
    { name: "Henle's layer hair root sheath cell", icon: "/icons/E1.png" },
    { name: "Inner root sheath cell", icon: "/icons/E1.png" },
    { name: "Matrix hair follicle cell", icon: "/icons/E1.png" },
    { name: "Bulge cell (hair follicle stem cell)", icon: "/icons/E1.png" },
    { name: "Dermal papilla cell", icon: "/icons/E1.png" },
    { name: "Apocrine gland epithelial cell", icon: "/icons/E1.png" },
    { name: "Sebocyte", icon: "/icons/E1.png" },
    { name: "Eccrine gland duct cell", icon: "/icons/E1.png" },
    { name: "Eccrine gland secretory cell", icon: "/icons/E1.png" },
    { name: "Odontoblast", icon: "/icons/E1.png" },
    { name: "Ameloblast", icon: "/icons/E1.png" },
    { name: "Cementoblast", icon: "/icons/E1.png" },
    { name: "Periodontal ligament cell", icon: "/icons/E1.png" },
    { name: "Taste bud cell", icon: "/icons/E1.png" },
    { name: "Respiratory epithelial cell", icon: "/icons/E1.png" },
    { name: "Pulmonary neuroendocrine cell", icon: "/icons/E1.png" },
    { name: "Enteroendocrine cell", icon: "/icons/E1.png" },
    { name: "Microfold cell (M cell)", icon: "/icons/E1.png" },
    { name: "Intestinal stem cell", icon: "/icons/E1.png" },
    { name: "Retinal pigment epithelium (RPE) cell", icon: "/icons/E1.png" },
    { name: "Lens epithelial cell", icon: "/icons/E1.png" },
    { name: "Lens fiber cell", icon: "/icons/E1.png" },
    { name: "Corneal endothelial cell", icon: "/icons/E1.png" },
    { name: "Corneal stromal cell", icon: "/icons/E1.png" },
    { name: "Olfactory sustentacular cell", icon: "/icons/E1.png" },
    { name: "Olfactory basal cell", icon: "/icons/E1.png" }
  ]
  ,
 "muscular": [
  { name: "Cardiac Muscle Cell (Cardiomyocyte)", icon: "/icons/strength.png" },
  { name: "Cardiac pacemaker cell", icon: "/icons/strength.png" },
  { name: "Purkinje fiber", icon: "/icons/strength.png" },
  { name: "Cardiomyocyte", icon: "/icons/strength.png" },
  { name: "Pericytes", icon: "/icons/strength.png" },
  { name: "Skeletal muscle cell (red)", icon: "/icons/strength.png" },
  { name: "Skeletal muscle cell (white)", icon: "/icons/strength.png" },
  { name: "Skeletal muscle cell (intermediate)", icon: "/icons/strength.png" },
  { name: "Smooth muscle cell (vascular)", icon: "/icons/strength.png" },
  { name: "Smooth muscle cell (visceral)", icon: "/icons/strength.png" },
  { name: "Smooth muscle cell (iris)", icon: "/icons/strength.png" },
  { name: "Myofibroblast", icon: "/icons/strength.png" },
  { name: "Myoblast", icon: "/icons/strength.png" },
  { name: "Myocyte", icon: "/icons/strength.png" },
  { name: "Myosatellite", icon: "/icons/strength.png" },
  { name: "Rhabdomyoblast", icon: "/icons/strength.png" }
]
,
  "nervous & sensory": [
  { name: "Neuron", icon: "/icons/nervous.png" },
  { name: "Astrocyte", icon: "/icons/nervous.png" },
  { name: "Oligodendrocyte", icon: "/icons/nervous.png" },
  { name: "Microglia", icon: "/icons/nervous.png" },
  { name: "Ependymal cell", icon: "/icons/nervous.png" },
  { name: "Schwann cell", icon: "/icons/nervous.png" },
  { name: "Satellite glial cell", icon: "/icons/nervous.png" },
  { name: "Rod cell", icon: "/icons/nervous.png" },
  { name: "Cone cell", icon: "/icons/nervous.png" },
  { name: "Inner hair cell", icon: "/icons/nervous.png" },
  { name: "Outer hair cell", icon: "/icons/nervous.png" },
  { name: "Olfactory receptor neuron", icon: "/icons/nervous.png" },
  { name: "Taste bud cell", icon: "/icons/nervous.png" },
  { name: "Retinal ganglion cell", icon: "/icons/nervous.png" },
  { name: "Purkinje cell (cerebellum)", icon: "/icons/nervous.png" },
  { name: "Bipolar retinal cell", icon: "/icons/nervous.png" },
  { name: "Müller cell", icon: "/icons/nervous.png" },
  { name: "Amacrine cell", icon: "/icons/nervous.png" },
  { name: "Vestibular hair cell", icon: "/icons/nervous.png" },
  { name: "Proprioceptive neuron", icon: "/icons/nervous.png" },
  { name: "Nociceptor (pain receptor)", icon: "/icons/nervous.png" },
  { name: "Thermoreceptor", icon: "/icons/nervous.png" },
  { name: "Carotid body cell", icon: "/icons/nervous.png" },
  { name: "GABAergic interneuron", icon: "/icons/nervous.png" },
  { name: "Glutamatergic neuron", icon: "/icons/nervous.png" },
  { name: "Motor neuron", icon: "/icons/nervous.png" },
  { name: "Sensory neuron", icon: "/icons/nervous.png" },
  { name: "Renshaw cells", icon: "/icons/nervous.png" }
  
],
"hematopoietic": [
  { name: "Erythrocyte", icon: "/icons/blood.png" },
  { name: "Platelet", icon: "/icons/blood.png" },
  { name: "Neutrophil", icon: "/icons/blood.png" },
  { name: "Eosinophil", icon: "/icons/blood.png" },
  { name: "Basophil", icon: "/icons/blood.png" },
  { name: "Monocyte", icon: "/icons/blood.png" },
  { name: "Hematopoietic stem cell", icon: "/icons/blood.png" },
  { name: "Erythroblast", icon: "/icons/blood.png" },
  { name: "Reticulocyte", icon: "/icons/blood.png" },
  { name: "Megakaryocyte", icon: "/icons/blood.png" },
  { name: "Myeloblast", icon: "/icons/blood.png" },
  { name: "Proerythroblast", icon: "/icons/blood.png" },
  { name: "Normoblast", icon: "/icons/blood.png" },
  { name: "Metamyelocyte", icon: "/icons/blood.png" },
  { name: "Promyelocyte", icon: "/icons/blood.png" },
  { name: "Marginal zone B cell", icon: "/icons/blood.png" }

],
  "stem & progenitory": [
    { name: "Embryonic stem cell", icon: "/icons/stem.png" },
    { name: "Hematopoietic stem cell", icon: "/icons/stem.png" },
    { name: "Mesenchymal stem cell", icon: "/icons/stem.png" },
    { name: "Endothelial progenitor cell", icon: "/icons/stem.png" },
    { name: "Oligodendrocyte progenitor cell", icon: "/icons/stem.png" },
    { name: "Bulge cell (hair follicle)", icon: "/icons/stem.png" },
    { name: "Neural stem cell", icon: "/icons/stem.png" },
    { name: "Intestinal stem cell", icon: "/icons/stem.png" },
    { name: "Epidermal stem cell", icon: "/icons/stem.png" },
    { name: "Satellite cell (muscle stem cell)", icon: "/icons/stem.png" },
    { name: "Spermatogonial stem cell", icon: "/icons/stem.png" },
    { name: "Oogonial stem cell", icon: "/icons/stem.png" },
    { name: "Hepatic progenitor cell", icon: "/icons/stem.png" },
    { name: "Pancreatic progenitor cell", icon: "/icons/stem.png" },
    { name: "Lung progenitor cell", icon: "/icons/stem.png" },
    { name: "Hemangioblast", icon: "/icons/stem.png" }

  ],
  "connective": [
  { name: "Fibroblast", icon: "/icons/connective.png" },
  { name: "Corneal fibroblasts (corneal keratocytes)", icon: "/icons/connective.png" },
  { name: "Adipocyte (white)", icon: "/icons/connective.png" },
  { name: "Adipocyte (brown)", icon: "/icons/connective.png" },
  { name: "Chondrocyte", icon: "/icons/connective.png" },
  { name: "Osteoblast", icon: "/icons/connective.png" },
  { name: "Osteocyte", icon: "/icons/connective.png" },
  { name: "Preadipocyte", icon: "/icons/connective.png" },
  { name: "Podocyte", icon: "/icons/connective.png" },
  { name: "Stromal cell", icon: "/icons/connective.png" },
  { name: "Myofibroblast", icon: "/icons/connective.png" },
  { name: "Chondroprogenitor cell", icon: "/icons/connective.png" },
  { name: "Adventitial fibroblast", icon: "/icons/connective.png" },
  { name: "Dermal fibroblast", icon: "/icons/connective.png" },
  { name: "Tendon fibroblast", icon: "/icons/connective.png" },
  { name: "Ligament fibroblast", icon: "/icons/connective.png" },
  { name: "Synovial fibroblast", icon: "/icons/connective.png" }
  ],
  "reproductive": [
    { name: "Spermatozoon", icon: "/icons/reproductive.png" },
    { name: "Oocyte", icon: "/icons/reproductive.png" },
    { name: "Sertoli cell", icon: "/icons/reproductive.png" },
    { name: "Leydig cell", icon: "/icons/reproductive.png" },
    { name: "Granulosa cell", icon: "/icons/reproductive.png" },
    { name: "Theca cell", icon: "/icons/reproductive.png" },
    { name: "Spermatogonium", icon: "/icons/reproductive.png" },
    { name: "Spermatocyte", icon: "/icons/reproductive.png" },
    { name: "Spermatid", icon: "/icons/reproductive.png" },
    { name: "Oogonium", icon: "/icons/reproductive.png" }
  ],
 "skeletal": [
  { name: "Osteoblast", icon: "/icons/skeletal.png" },
  { name: "Osteocyte", icon: "/icons/skeletal.png" },
  { name: "Chondrocyte", icon: "/icons/skeletal.png" },
  { name: "Osteoprogenitor cell", icon: "/icons/skeletal.png" },
  { name: "Bone lining cell", icon: "/icons/skeletal.png" },
  { name: "Osteoclast", icon: "/icons/skeletal.png" },
  { name: "Chondroclast", icon: "/icons/skeletal.png" },
  { name: "Osteochondroprogenitor Cell", icon: "/icons/skeletal.png" }
]
,
  "gastrointestinal": [
  { name: "Enteroendocrine cell", icon: "/icons/gastrointestinal.png" },
  { name: "Tuft cell", icon: "/icons/gastrointestinal.png" },
  { name: "Intestinal stem cell", icon: "/icons/gastrointestinal.png" },
  { name: "Paneth-like cell", icon: "/icons/gastrointestinal.png" },
  { name: "Gastric chief cell", icon: "/icons/gastrointestinal.png" },
  { name: "Gastric parietal cell", icon: "/icons/gastrointestinal.png" },
  { name: "Enterochromaffin cell", icon: "/icons/gastrointestinal.png" },
  { name: "Goblet cell (intestinal)", icon: "/icons/gastrointestinal.png" },
  { name: "Cholecystocyte", icon: "/icons/gastrointestinal.png" },
  { name: "Cholangiocyte", icon: "/icons/gastrointestinal.png" }
  ],
  "thoracic": [
   { name: "Pneumocyte type I", icon: "/icons/thoracic.png" },
  { name: "Pneumocyte type II", icon: "/icons/thoracic.png" },
  { name: "Pulmonary neuroendocrine cell", icon: "/icons/thoracic.png" },
  { name: "Club cell", icon: "/icons/thoracic.png" },
  { name: "Ciliated airway cell", icon: "/icons/thoracic.png" },
  { name: "Goblet cell (respiratory)", icon: "/icons/thoracic.png" },
  { name: "Bronchial epithelial cell", icon: "/icons/thoracic.png" },
  { name: "Alveolar macrophage", icon: "/icons/thoracic.png" },
  { name: "Pulmonary endothelial cell", icon: "/icons/thoracic.png" },
  { name: "Tracheal epithelial cell", icon: "/icons/thoracic.png" }
  ],
  "secretory & endocrine":[
    { name: "Pancreatic beta cell", icon: "/icons/secretory.png" },
    { name: "Pancreatic alpha cell", icon: "/icons/secretory.png" },
    { name: "Pancreatic delta cell", icon: "/icons/secretory.png" },
    { name: "Chromaffin cell", icon: "/icons/secretory.png" },
    { name: "Parafollicular cell", icon: "/icons/secretory.png" },
    { name: "Pinealocyte", icon: "/icons/secretory.png" },
    { name: "Gonadotrope", icon: "/icons/secretory.png" },
    { name: "Somatotrope", icon: "/icons/secretory.png" },
    { name: "Corticotrope", icon: "/icons/secretory.png" },
    { name: "Lactotrope", icon: "/icons/secretory.png" },
    { name: "Thyrotrope", icon: "/icons/secretory.png" },
    { name: "Juxtaglomerular cell", icon: "/icons/secretory.png" },
    { name: "Macula densa cell", icon: "/icons/secretory.png" },
    { name: "Parathyroid chief cell", icon: "/icons/secretory.png" },
    { name: "Parathyroid oxyphil cell", icon: "/icons/secretory.png" },
    { name: "Zona glomerulosa cell", icon: "/icons/secretory.png" },
    { name: "Zona fasciculata cell", icon: "/icons/secretory.png" },
    { name: "Zona reticularis cell", icon: "/icons/secretory.png" },
    { name: "Salivary gland acinar cell", icon: "/icons/secretory.png" },
    { name: "Salivary gland duct cell", icon: "/icons/secretory.png" }
  ],
 "immune": [
  { name: "Macrophage", icon: "/icons/immune1.png" },
  { name: "Dendritic cell", icon: "/icons/immune1.png" },
  { name: "B cell", icon: "/icons/immune1.png" },
  { name: "Plasma cell", icon: "/icons/immune1.png" },
  { name: "CD4+ T cell", icon: "/icons/immune1.png" },
  { name: "CD8+ T cell", icon: "/icons/immune1.png" },
  { name: "Regulatory T cell", icon: "/icons/immune1.png" },
  { name: "Natural killer (NK) cell", icon: "/icons/immune1.png" },
  { name: "Mast cell", icon: "/icons/immune1.png" },
  { name: "Microglia", icon: "/icons/immune1.png" },
  { name: "Kupffer cell", icon: "/icons/immune1.png" },
  { name: "Langerhans cell", icon: "/icons/immune1.png" },
  { name: "Follicular dendritic cell", icon: "/icons/immune1.png" },
  { name: "Gamma-delta T cell", icon: "/icons/immune1.png" },
  { name: "MAIT cell", icon: "/icons/immune1.png" },
  { name: "Innate lymphoid cell (ILC1/2/3)", icon: "/icons/immune1.png" },
  { name: "Tissue-resident memory T cell", icon: "/icons/immune1.png" },
  { name: "Effector memory T cell", icon: "/icons/immune1.png" },
  { name: "Plasmacytoid dendritic cell", icon: "/icons/immune1.png" },
  { name: "Marginal zone B cell", icon: "/icons/immune1.png" },
  { name: "Memory B cell", icon: "/icons/immune1.png" },
  { name: "Naive B cell", icon: "/icons/immune1.png" },
  { name: "CX3CR1+ monocyte", icon: "/icons/immune1.png" },
  { name: "Ly6C+ monocyte", icon: "/icons/immune1.png" },
  { name: "Immature dendritic cell", icon: "/icons/immune1.png" },
  { name: "Decidual NK cell", icon: "/icons/immune1.png" },
  { name: "T follicular helper (Tfh) cell", icon: "/icons/immune1.png" },
  { name: "CXCR5+ T cell", icon: "/icons/immune1.png" },
  { name: "CCR7+ T cell", icon: "/icons/immune1.png" },
  { name: "Hofbauer cell", icon: "/icons/immune1.png" },
  { name: "Alveolar macrophage", icon: "/icons/immune1.png" },
  { name: "Peritoneal macrophage", icon: "/icons/immune1.png" },
  { name: "Osteoclast", icon: "/icons/immune1.png" },
  { name: "Mesangial cell (immune function)", icon: "/icons/immune1.png" },
  { name: "Pericyte (immune modulation)", icon: "/icons/immune1.png" },
  { name: "Myeloid-derived suppressor cell (MDSC)", icon: "/icons/immune1.png" }
]

};

// Move group descriptions outside component to prevent recreation on every render
const groupDescriptions = {
  "epithelial": "**Epithelial cells** form the linings of body surfaces, cavities, and organs, acting as a _protective barrier_ between internal and external environments. They are _tightly packed_, rest on a **basement membrane**, and come in various shapes—_squamous_, _cuboidal_, or _columnar_—arranged in single or multiple layers. These cells handle **protection**, **absorption**, **secretion**, **filtration**, and **sensation**. Some have special features like **microvilli** or **cilia**. They also form **endocrine** and **exocrine glands**, regenerate rapidly, and are common sources of cancers called _carcinomas_."


  ,"muscular": "**Muscle cells** (_myocytes_) are elongated cells that contract using `actin` and `myosin`, enabling **movement** and **force generation**. They come in three types: **skeletal** (voluntary, striated), **cardiac** (involuntary, striated with intercalated discs), and **smooth** (involuntary, non-striated). These cells are specialized for **excitability**, **contractility**, and **elasticity**, relying heavily on `ATP` and blood supply. Disorders like _muscular dystrophy_ or _cardiomyopathies_ impair their function."

  ,"nervous & sensory": "**Nervous cells**, or _neurons_, are highly specialized cells that make up the core functional units of the **nervous system**, responsible for **transmitting** and **processing information** throughout the body. Each neuron consists of a **cell body** (`soma`), **dendrites** that receive signals, and a **single axon** that transmits electrical impulses to other neurons, muscles, or glands. They communicate via **electrochemical signals** using electrical impulses (`action potentials`) and chemical messengers (`neurotransmitters`) at **synapses**. Alongside neurons, **glial cells** provide support, protection, and nourishment. Nervous cells regulate activities like **sensation**, **movement**, **cognition**, and **emotion**, but have limited regenerative ability, making damage serious. They form the **central nervous system** (brain and spinal cord) and **peripheral nervous system** (nerves), working together to sense stimuli, process data, and initiate responses, thus governing nearly all body functions and behavior."

  ,"hematopoietic": "**Blood cells** are specialized cells in plasma that perform vital functions in the **circulatory system**, including **oxygen transport**, **immune defense**, and **clotting**. Main types are **red blood cells** (`erythrocytes`), **white blood cells** (`leukocytes`), and **platelets** (`thrombocytes`). Red cells are biconcave, lack nuclei, and carry oxygen via **hemoglobin**. White cells protect against pathogens and include types like **neutrophils**, **lymphocytes**, and **monocytes**, each with specific roles. Platelets are fragments that help with **clotting** by forming plugs and releasing clotting factors. All originate from **hematopoietic stem cells** in the **bone marrow** and circulate via blood vessels. Constantly renewed, they are essential for **homeostasis**, injury response, and oxygen delivery. Disruptions can cause conditions like _anemia_, _infection_, or _leukemia_."

  ,"gastrointestinal": "**Gastrointestinal (GI) cells**, including those from the _liver_ and _pancreas_, specialize in **digestion**, **absorption**, **enzyme secretion**, **detoxification**, and **hormone regulation**. In the stomach and intestines, key types include **enterocytes** (`absorb nutrients`), **goblet cells** (`secrete mucus`), **Paneth cells** (`release antimicrobial peptides`), **enteroendocrine cells** (`digestive hormones`), **parietal** and **chief cells** (`acid and enzymes`). In the **liver**, **hepatocytes** handle `metabolism`, `bile production`, and `detoxification`, while **Kupffer cells** (`macrophages`) and **stellate cells** (`vitamin A storage`) aid immunity and repair. **Pancreatic acinar cells** secrete digestive enzymes, **ductal cells** transport them, and **islets of Langerhans** regulate blood sugar via **alpha**, **beta**, and **delta cells**. Together, GI cells maintain **digestive health**, **metabolism**, and **immunity**."

  ,"stem & progenitory": "**Stem cells** are unique, undifferentiated cells capable of **self-renewal** and **differentiation** into specialized cell types, crucial for growth, repair, and regeneration. They vary by potential: **totipotent** (all cells including embryonic), **pluripotent** (any body cell), and **multipotent** (limited families like blood or nerve). They also vary by source: **embryonic**, **adult (somatic)**, and **induced pluripotent stem cells (iPSCs)**—adult cells genetically reprogrammed. Stem cells drive **tissue maintenance**, healing, and are central to **regenerative medicine**, targeting conditions like **spinal injuries**, **blood disorders**, and **neurodegeneration**."

  ,"thoracic": "**Thoracic cells** reside in the **lungs**, **trachea**, **bronchi**, and **pleura**, supporting **breathing**, **gas exchange**, and **defense**. **Alveolar Type I cells** manage `gas exchange`, and **Type II cells** secrete `surfactant` to keep alveoli open. **Bronchial epithelial cells** like **ciliated** and **goblet cells** remove dust/microbes with mucus and cilia. **Club (Clara) cells** in bronchioles detoxify and assist in repair. **Pulmonary endothelial cells** regulate capillary `gas/fluid exchange`. **Pleural mesothelial cells** reduce friction via `fluid secretion`. Collectively, they sustain **respiratory function** and shield against environmental hazards."

  ,"connective": "**Connective tissue cells** form the body's **structural framework**, supporting, binding, and protecting organs. Embedded in an **extracellular matrix** of fibers (e.g., **collagen**, **elastin**) and ground substance, they include **fibroblasts** (make matrix), **adipocytes** (store fat), **chondrocytes** (cartilage), and **osteocytes** (bone). Also present are **macrophages**, **mast cells**, **plasma cells**, and **leukocytes** that handle **immunity** and **inflammation**. Based on type—loose, dense, cartilage, bone, blood—connective cells handle **support**, **repair**, **protection**, and **communication** across tissues."

  ,"secretory & endocrine": "**Endocrine cells** secrete **hormones** into the bloodstream or interstitial fluid, regulating processes like **metabolism**, **growth**, and **homeostasis**. Unlike **exocrine cells** that use ducts, endocrine cells release internally for **systemic effect**. They exist alone (e.g., **enteroendocrine cells**) or in glands (e.g., **thyroid**, **adrenal**), featuring **vesicles**, **rough ER**, and **Golgi** for protein synthesis. Operated by **feedback loops** (mainly negative feedback), they maintain **hormonal balance**. Dysfunctions can cause **endocrine disorders**, underlining their importance in internal regulation."

  ,"immune": "**Immune cells** (a.k.a. **white blood cells** or **leukocytes**) defend against **pathogens**, **toxins**, and **abnormal cells**. Divided into **innate** (fast, non-specific: `neutrophils`, `macrophages`, `NK cells`, `dendritic cells`, `mast cells`) and **adaptive** (slow, specific: `T cells`, `B cells`) arms. **T cells** kill infected cells or coordinate responses; **B cells** produce **antibodies**. These cells move through **blood**, **lymph**, and **lymphoid organs** (e.g., **spleen**, **nodes**, **bone marrow**), communicating via **cytokines**. They're vital for **infection defense**, **cancer surveillance**, and **immune tolerance**. Malfunction leads to **autoimmunity**, **immunodeficiency**, or **chronic inflammation**."

  ,"reproductive": "**Reproductive cells**, or **gametes**, carry **genetic material** to offspring via **sexual reproduction**. **Sperm cells** (male) form in the **testes** through `spermatogenesis`, are **motile**, and have tails. **Egg cells** (ova, female) develop in **ovaries** via `oogenesis`, are **non-motile**, and nutrient-rich. Both are **haploid** (`23 chromosomes`) and fuse to form a **diploid zygote** (`46 chromosomes`). Sperm are built for speed; eggs for **nurturing embryos**. Regulated by hormones like **FSH**, **LH**, **estrogen**, and **testosterone**, disruptions lead to **infertility** or **genetic defects**."

  ,"skeletal": "**Skeletal cells** build and maintain **bones** and **cartilage**, supporting movement and protection. Key types are **osteoblasts** (form new bone), **osteocytes** (mature bone cells responding to stress), and **osteoclasts** (break down bone for remodeling and calcium regulation). **Chondrocytes**, found in **cartilage**, maintain its matrix and enable **joint function**. These cells work in unison to adapt bone to stress, repair damage, and maintain mineral levels. Dysfunction causes **osteoporosis**, **arthritis**, or **growth defects**."
};

const GroupPage = () => {
  const { groupName } = useParams();
  const navigate = useNavigate();
  const { isDarkMode } = useTheme();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [groupName]);

  // Memoize cell types and description to prevent recalculation on every render
  const cellTypes = useMemo(() => cellGroupTypes[groupName] || [], [groupName]);
  const description = useMemo(() => groupDescriptions[groupName] || `[Full description of the ${groupName} cell group will go here.]`, [groupName]);

  // Memoize event handlers to prevent recreation on every render
  const handleBackClick = useCallback(() => {
    navigate('/');
  }, [navigate]);

  const handleCellClick = useCallback((cellName) => {
    navigate(`/cell/${cellName.toLowerCase().replace(/\s+/g, '-')}`);
  }, [navigate]);

  return (
    <div className={`relative min-h-screen flex flex-col items-center justify-center px-4 py-6 ${
      isDarkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
    }`}>
      {/* Overlay for transparency */}
      <div className={`fixed inset-0 w-full h-full z-0 pointer-events-none ${
        isDarkMode ? "bg-gray-900/80" : "bg-gray-100/80"
      }`} />
      {/* Back button */}
      <button
        type="button"
        onClick={handleBackClick}
        className="absolute left-4 bottom-4 z-50 bg-[#5a2328] hover:bg-[#43181c] text-white font-bold py-1 px-5 rounded-3xl shadow-lg focus:outline-none focus:ring-2 focus:ring-[#7a3b3f] transition-all duration-200 text-lg flex items-center gap-2"
        style={{ minWidth: '120px' }}
      >
        &#8592; Home
      </button>
      <div className="relative z-10 flex flex-col items-center w-full">
        <h1 className="text-4xl font-bold mb-4 capitalize drop-shadow-lg">{groupName} Cells</h1>
        <div className="mb-4 text-lg max-w-6xl text-center">
          <ReactMarkdown>{description}</ReactMarkdown>
        </div>
        <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6 w-full max-w-4xl mt-4 mb-8 justify-center">
          {cellTypes.length === 0 ? (
            <span className={`col-span-full text-center ${
              isDarkMode ? "text-gray-400" : "text-gray-600"
            }`}>No cell types found for this group.</span>
          ) : (
            cellTypes.map((cell) => (
              <button
                key={cell.name}
                onClick={() => handleCellClick(cell.name)}
                className="group w-full flex items-center justify-center gap-3 bg-[#5a2328] text-white rounded-2xl shadow-lg hover:bg-[#43181c] active:bg-[#2e0d10] focus:outline-none focus:ring-2 focus:ring-[#7a3b3f] transition-all duration-200 text-lg font-semibold min-h-[56px] px-3 py-2"
              >
                <img src={cell.icon} alt={cell.name + ' icon'} className="w-10 h-10 object-contain flex-shrink-0 drop-shadow group-hover:scale-110 group-active:scale-95 transition-transform duration-200" />
                <span className="truncate">{cell.name}</span>
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default GroupPage; 