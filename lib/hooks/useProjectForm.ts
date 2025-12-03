import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import type { Tag } from "@/lib/supabase";

export interface ProjectFormData {
  title: string;
  summary: string;
  description: string;
  startDate: string;
  endDate: string;
  roles: string[];
  tags: string[];
}

const supabase = createClient();

/**
 * プロジェクトフォームの共通ロジックを提供するカスタムフック
 */
export function useProjectForm(initialData?: Partial<ProjectFormData>) {
  const [formData, setFormData] = useState<ProjectFormData>({
    title: initialData?.title || "",
    summary: initialData?.summary || "",
    description: initialData?.description || "",
    startDate: initialData?.startDate || "",
    endDate: initialData?.endDate || "",
    roles: initialData?.roles || [],
    tags: initialData?.tags || [],
  });

  const [isCurrent, setIsCurrent] = useState(false);
  const [availableTags, setAvailableTags] = useState<Tag[]>([]);
  const [availablePhases, setAvailablePhases] = useState<string[]>([]);

  // タグ一覧と工程一覧を並列取得
  useEffect(() => {
    const loadData = async () => {
      const [{ data: tags }, { data: roles }] = await Promise.all([
        supabase.from("tags").select("*").order("name", { ascending: true }),
        supabase
          .from("roles")
          .select("name")
          .order("display_order", { ascending: true }),
      ]);

      if (tags) {
        setAvailableTags(tags);
      }
      if (roles) {
        setAvailablePhases(roles.map((role) => role.name));
      }
    };

    loadData();
  }, []);

  const handleAddPhase = (phase: string) => {
    if (!formData.roles.includes(phase)) {
      setFormData({
        ...formData,
        roles: [...formData.roles, phase],
      });
    }
  };

  const handleRemovePhase = (phase: string) => {
    setFormData({
      ...formData,
      roles: formData.roles.filter((r) => r !== phase),
    });
  };

  const handleToggleTag = (tagName: string) => {
    if (formData.tags.includes(tagName)) {
      setFormData({
        ...formData,
        tags: formData.tags.filter((t) => t !== tagName),
      });
    } else {
      setFormData({
        ...formData,
        tags: [...formData.tags, tagName],
      });
    }
  };

  const handleRemoveTag = (tag: string) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter((t) => t !== tag),
    });
  };

  return {
    formData,
    setFormData,
    isCurrent,
    setIsCurrent,
    availableTags,
    availablePhases,
    handleAddPhase,
    handleRemovePhase,
    handleToggleTag,
    handleRemoveTag,
  };
}
