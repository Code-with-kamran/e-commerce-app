import 'dotenv/config'
import { PrismaClient } from '../src/generated/prisma'
import { PrismaNeon } from '@prisma/adapter-neon'
import bcrypt from 'bcryptjs'

const adapter = new PrismaNeon({
  connectionString: process.env.DATABASE_URL!,
})

const prisma = new PrismaClient({ adapter })

async function main() {
  console.log('🌱 Starting seed...')

  // ── Admin User ────────────────────────────────────────────────────
  const hashedPassword = await bcrypt.hash('Admin@12345!', 12)

  const admin = await prisma.adminUser.upsert({
    where:  { email: 'admin@yourshop.com' },
    update: {},
    create: {
      email:    'admin@yourshop.com',
      hashedPassword,
    },
  })

  console.log(`✅ Admin user: ${admin.email}`)

  // ── Starter Categories ────────────────────────────────────────────
  const categories = [
    { name: 'All Products', slug: 'all-products' },
    { name: 'New Arrivals', slug: 'new-arrivals' },
    { name: 'Best Sellers', slug: 'best-sellers' },
  ]

  for (const cat of categories) {
    const created = await prisma.category.upsert({
      where:  { slug: cat.slug },
      update: { name: cat.name },
      create: cat,
    })
    console.log(`✅ Category: ${created.name}`)
  }

  console.log('🎉 Seed complete.')
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
