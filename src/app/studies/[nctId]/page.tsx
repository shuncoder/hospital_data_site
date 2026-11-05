import { getStudy } from "@/lib/clinical-trials";
import { StudyDetailContent } from "@/components/studies/study-detail-content";

export default async function StudyDetailPage({ params }: { params: { nctId: string } }) {
  const study = await getStudy(params.nctId);
  return <StudyDetailContent study={study} />;
}
