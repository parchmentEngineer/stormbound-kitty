import PageGuides from '~/components/PageGuides'
import { GUIDE_CATEGORIES } from '~/constants/guides'
import getGuidesFromCategory from '~/api/guides/getGuidesFromCategory'
import getSiteSettings from '~/api/misc/getSiteSettings'

export async function getStaticProps({ preview: isPreview = false }) {
  const name = 'BRAWL_MODE'
  const category = { ...GUIDE_CATEGORIES[name], id: name }
  const guides = await getGuidesFromCategory({ category: name, isPreview })
  const settings = await getSiteSettings({ isPreview })

  return {
    props: { category, guides, settings, breadcrumbs: ['GUIDES', name] },
  }
}

export default PageGuides
