import { NextResponse } from 'next/server'
import { getSupabaseServerClient } from '@/lib/supabase'

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = getSupabaseServerClient()
    const { error } = await supabase.from('media').delete().eq('id', params.id)
    if (error) throw error

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Server error' }, { status: 500 })
  }
}
