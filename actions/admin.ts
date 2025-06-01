"use server"

import { auth } from "@/auth"
import { createPost as createPostData, updatePost as updatePostData, deletePost as deletePostData } from "@/data/post"
import { revalidatePath } from "next/cache"

export const createPost = async (data: {
  title: string
  content: string
  categoryId: number
}) => {
  const session = await auth()

  if (!session?.user?.id || session.user.role !== "ADMIN") {
    return { success: false, message: "권한이 없습니다." }
  }

  try {
    const post = await createPostData({
      title: data.title,
      content: data.content,
      categoryId: data.categoryId,
      userId: session.user.id,
    })

    revalidatePath("/")
    revalidatePath(`/categories/${data.categoryId}`)

    return { success: true, postId: post.id }
  } catch (error) {
    console.error("Error creating post:", error)
    return { success: false, message: "게시글 작성 중 오류가 발생했습니다." }
  }
}

export const updatePost = async (
  id: number,
  data: {
    title: string
    content: string
    categoryId: number
  },
) => {
  const session = await auth()

  if (!session?.user?.id || session.user.role !== "ADMIN") {
    return { success: false, message: "권한이 없습니다." }
  }

  try {
    await updatePostData(id, {
      title: data.title,
      content: data.content,
      categoryId: data.categoryId,
    })

    revalidatePath(`/posts/${id}`)
    revalidatePath(`/categories/${data.categoryId}`)

    return { success: true }
  } catch (error) {
    console.error("Error updating post:", error)
    return { success: false, message: "게시글 수정 중 오류가 발생했습니다." }
  }
}

export const deletePost = async (id: number) => {
  const session = await auth()

  if (!session?.user?.id || session.user.role !== "ADMIN") {
    return { success: false, message: "권한이 없습니다." }
  }

  try {
    await deletePostData(id)

    revalidatePath("/")

    return { success: true }
  } catch (error) {
    console.error("Error deleting post:", error)
    return { success: false, message: "게시글 삭제 중 오류가 발생했습니다." }
  }
}
