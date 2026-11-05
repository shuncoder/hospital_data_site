export const languages = {
  vi: { label: "Tiếng Việt", flag: "🇻🇳" },
  en: { label: "English", flag: "🇬🇧" },
  es: { label: "Español", flag: "🇪🇸" },
  zh: { label: "中文", flag: "🇨🇳" }
} as const;

export type Language = keyof typeof languages;

const translations = {
  vi: {
    navSearch: "Tra cứu", dashboard: "Dashboard", searchStudies: "Tìm nghiên cứu",
    openData: "Dữ liệu y khoa mở", heroTitle: "Khám phá nghiên cứu y khoa", heroAccent: "toàn cầu",
    heroDescription: "Tra cứu hơn hàng nghìn thử nghiệm lâm sàng, theo dõi tiến độ và tìm cơ hội nghiên cứu phù hợp từ ClinicalTrials.gov.",
    updated: "Cập nhật liên tục", advancedFilters: "Bộ lọc chuyên sâu", noRegistration: "Không cần đăng ký",
    searchSmart: "Tìm kiếm thông minh", searchSmartDesc: "Kết hợp từ khóa, trạng thái, quốc gia và giai đoạn để thu hẹp kết quả.",
    trustedData: "Dữ liệu đáng tin cậy", trustedDataDesc: "Thông tin được lấy trực tiếp từ ClinicalTrials.gov API v2 và làm mới liên tục.",
    trends: "Theo dõi xu hướng", trendsDesc: "Xem nhanh phân bổ trạng thái, quốc gia và quy mô nghiên cứu trên dashboard.",
    researchLibrary: "Thư viện nghiên cứu", searchResults: "Kết quả tìm kiếm", researchCenter: "Trung tâm phân tích",
    dashboardTitle: "Dashboard nghiên cứu", dashboardDesc: "Theo dõi nhanh bức tranh tổng thể của dữ liệu thử nghiệm lâm sàng.",
    lastUpdated: "Cập nhật lần cuối: hôm nay", totalStudies: "Tổng nghiên cứu", recruiting: "Đang tuyển",
    participatingCountries: "Quốc gia tham gia", newThisMonth: "Nghiên cứu mới tháng này", byStatus: "Theo trạng thái",
    byPhase: "Theo giai đoạn", recentActivity: "Hoạt động gần đây", allStatuses: "Mọi trạng thái",
    allPhases: "Mọi giai đoạn", countryPlaceholder: "Quốc gia (US, VN...)", clearFilters: "Xóa bộ lọc",
    resultsCount: "Hiển thị", studies: "nghiên cứu", source: "Nguồn: ClinicalTrials.gov",
    loadMore: "Tải thêm nghiên cứu →", loading: "Đang tải...", noResults: "Không tìm thấy nghiên cứu phù hợp.",
    loadingData: "Đang tải dữ liệu...", error: "Không thể tải dữ liệu. Vui lòng thử lại.",
    sponsor: "Nhà tài trợ", location: "Địa điểm", phase: "Giai đoạn", participants: "người",
    summary: "Tóm tắt nghiên cứu", quickInfo: "Thông tin nhanh", timeline: "Mốc thời gian",
    start: "Bắt đầu", firstPosted: "Cập nhật đầu tiên", completion: "Dự kiến hoàn tất",
    locations: "Địa điểm", backResults: "Quay lại kết quả"
  },
  en: {
    navSearch: "Search", dashboard: "Dashboard", searchStudies: "Find studies",
    openData: "Open medical data", heroTitle: "Discover medical research", heroAccent: "worldwide",
    heroDescription: "Search thousands of clinical trials, track progress, and find relevant research opportunities from ClinicalTrials.gov.",
    updated: "Always updated", advancedFilters: "Advanced filters", noRegistration: "No registration required",
    searchSmart: "Smart search", searchSmartDesc: "Combine keywords, status, country, and phase to narrow down results.",
    trustedData: "Trusted data", trustedDataDesc: "Information comes directly from the ClinicalTrials.gov API v2 and is refreshed continuously.",
    trends: "Track trends", trendsDesc: "Quickly review status, country, and study-size distributions on the dashboard.",
    researchLibrary: "Research library", searchResults: "Search results", researchCenter: "Analytics center",
    dashboardTitle: "Research dashboard", dashboardDesc: "Get a quick overview of clinical trial data.",
    lastUpdated: "Last updated: today", totalStudies: "Total studies", recruiting: "Recruiting",
    participatingCountries: "Participating countries", newThisMonth: "New studies this month", byStatus: "By status",
    byPhase: "By phase", recentActivity: "Recent activity", allStatuses: "All statuses",
    allPhases: "All phases", countryPlaceholder: "Country (US, VN...)", clearFilters: "Clear filters",
    resultsCount: "Showing", studies: "studies", source: "Source: ClinicalTrials.gov",
    loadMore: "Load more studies →", loading: "Loading...", noResults: "No matching studies found.",
    loadingData: "Loading data...", error: "Unable to load data. Please try again.",
    sponsor: "Sponsor", location: "Location", phase: "Phase", participants: "participants",
    summary: "Study summary", quickInfo: "Quick information", timeline: "Timeline",
    start: "Start", firstPosted: "First posted", completion: "Estimated completion",
    locations: "Locations", backResults: "Back to results"
  },
  es: {
    navSearch: "Buscar", dashboard: "Panel", searchStudies: "Buscar estudios",
    openData: "Datos médicos abiertos", heroTitle: "Descubre investigación médica", heroAccent: "mundial",
    heroDescription: "Busca miles de ensayos clínicos, sigue su progreso y encuentra oportunidades de investigación en ClinicalTrials.gov.",
    updated: "Actualizado continuamente", advancedFilters: "Filtros avanzados", noRegistration: "Sin registro",
    searchSmart: "Búsqueda inteligente", searchSmartDesc: "Combina palabras clave, estado, país y fase para acotar los resultados.",
    trustedData: "Datos fiables", trustedDataDesc: "La información procede directamente de la API v2 de ClinicalTrials.gov.",
    trends: "Sigue las tendencias", trendsDesc: "Consulta rápidamente estados, países y tamaños de estudios en el panel.",
    researchLibrary: "Biblioteca de investigación", searchResults: "Resultados de búsqueda", researchCenter: "Centro de análisis",
    dashboardTitle: "Panel de investigación", dashboardDesc: "Obtén una visión general de los datos de ensayos clínicos.",
    lastUpdated: "Última actualización: hoy", totalStudies: "Total de estudios", recruiting: "En reclutamiento",
    participatingCountries: "Países participantes", newThisMonth: "Nuevos estudios este mes", byStatus: "Por estado",
    byPhase: "Por fase", recentActivity: "Actividad reciente", allStatuses: "Todos los estados",
    allPhases: "Todas las fases", countryPlaceholder: "País (US, VN...)", clearFilters: "Borrar filtros",
    resultsCount: "Mostrando", studies: "estudios", source: "Fuente: ClinicalTrials.gov",
    loadMore: "Cargar más estudios →", loading: "Cargando...", noResults: "No se encontraron estudios.",
    loadingData: "Cargando datos...", error: "No se pudieron cargar los datos. Inténtalo de nuevo.",
    sponsor: "Patrocinador", location: "Ubicación", phase: "Fase", participants: "participantes",
    summary: "Resumen del estudio", quickInfo: "Información rápida", timeline: "Cronología",
    start: "Inicio", firstPosted: "Publicado por primera vez", completion: "Finalización estimada",
    locations: "Ubicaciones", backResults: "Volver a resultados"
  },
  zh: {
    navSearch: "搜索", dashboard: "数据面板", searchStudies: "查找研究",
    openData: "开放医学数据", heroTitle: "探索全球", heroAccent: "医学研究",
    heroDescription: "搜索数千项临床试验，跟踪研究进展，并从 ClinicalTrials.gov 寻找相关研究机会。",
    updated: "持续更新", advancedFilters: "高级筛选", noRegistration: "无需注册",
    searchSmart: "智能搜索", searchSmartDesc: "结合关键词、状态、国家和阶段来缩小结果范围。",
    trustedData: "可靠数据", trustedDataDesc: "信息直接来自 ClinicalTrials.gov API v2，并持续刷新。",
    trends: "追踪趋势", trendsDesc: "在数据面板中快速查看状态、国家和研究规模分布。",
    researchLibrary: "研究库", searchResults: "搜索结果", researchCenter: "分析中心",
    dashboardTitle: "研究数据面板", dashboardDesc: "快速了解临床试验数据全貌。",
    lastUpdated: "最后更新：今天", totalStudies: "研究总数", recruiting: "正在招募",
    participatingCountries: "参与国家", newThisMonth: "本月新增研究", byStatus: "按状态",
    byPhase: "按阶段", recentActivity: "最近活动", allStatuses: "所有状态",
    allPhases: "所有阶段", countryPlaceholder: "国家（US、VN...）", clearFilters: "清除筛选",
    resultsCount: "显示", studies: "项研究", source: "来源：ClinicalTrials.gov",
    loadMore: "加载更多研究 →", loading: "加载中...", noResults: "没有找到匹配的研究。",
    loadingData: "正在加载数据...", error: "无法加载数据，请重试。",
    sponsor: "赞助方", location: "地点", phase: "阶段", participants: "名参与者",
    summary: "研究摘要", quickInfo: "快速信息", timeline: "时间线",
    start: "开始", firstPosted: "首次发布", completion: "预计完成",
    locations: "地点", backResults: "返回结果"
  }
} as const;

export type TranslationKey = keyof typeof translations.vi;
export function getTranslations(language: Language) {
  return translations[language];
}
