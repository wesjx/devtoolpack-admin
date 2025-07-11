
# 🧰 DevToolPack.tech

DevToolPack is a platform where authenticated users can submit useful tools for developers. Each tool is created through an interactive form and stored in a Neon PostgreSQL database. Submitted tools are displayed publicly on the **Posts** page.

---

## 🚀 Main Feature

Logged-in users can:

1. Access a custom-built interactive form.
2. Fill in tool information (title, descriptions in PT/EN, category, image, and link).
3. Submit the tool, which is saved to the database.
4. View all tools on the `/posts` page.

---

## 🛠️ Technologies Used

- **Next.js (App Router) + TypeScript** – Main application framework
- **shadcn/ui** – Accessible and elegant UI components
- **Clerk** – User authentication
- **Drizzle ORM** – Database interaction (PostgreSQL with Neon)
- **Neon** – Scalable and fast PostgreSQL database
- **OpenAI API** – Automatic translation for description fields
- **Google Cloud Storage** – Image hosting
- **Vercel Blob (optional)** – Image uploads
- **Zod** – Schema validation for forms

---

## 📁 Folder Structure (simplified)

```
app/
├─ actions/posts/        # Server-side actions (delete, update, etc.)
├─ api/                  # Routes for upload, translate, etc.
├─ posts/                # Posts page
├─ favicon.ico           # Website icon
components/ui/           # Form and UI components
data/                    # DB queries (getPosts, etc.)
db/                      # Drizzle schema and config
validation/              # Zod validation schemas
```

---

## 💡 Contributing

Feel free to contribute with bug fixes, improvements, or new features.

📬 If you'd like to collaborate, please reach out:  
**wesjrpiri@gmail.com**

---

## 🧪 In Progress

- Admin dashboard
- Search and category filter system
- Preview modal for tools
- Pagination system

---


