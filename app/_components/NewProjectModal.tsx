"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import type { Tag } from "@/lib/supabase";
import TagSelector from "./TagSelector";
import ModalHeader from "./modal/ModalHeader";
import NoticeInfo from "./modal/NoticeInfo";
import ProjectBasicFields from "./modal/ProjectBasicFields";
import DateRangeFields from "./modal/DateRangeFields";
import PhaseSelector from "./modal/PhaseSelector";
import FormActions from "./modal/FormActions";

interface NewProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const supabase = createClient();

export default function NewProjectModal({
  isOpen,
  onClose,
}: NewProjectModalProps) {
  const [formData, setFormData] = useState({
    title: "",
    summary: "",
    description: "",
    startDate: "",
    endDate: "",
    roles: [] as string[],
    tags: [] as string[],
  });

  const [isCurrent, setIsCurrent] = useState(false);
  const [availableTags, setAvailableTags] = useState<Tag[]>([]);

  // タグ一覧を取得
  useEffect(() => {
    const loadTags = async () => {
      const { data: tags } = await supabase
        .from('tags')
        .select('*')
        .order('name', { ascending: true });

      if (tags) {
        setAvailableTags(tags);
      }
    };

    if (isOpen) {
      loadTags();
    }
  }, [isOpen]);

  // モーダル表示時に背景のスクロールを無効化
  useEffect(() => {
    if (isOpen) {
      // モーダルを開いた時、背景のスクロールを無効化
      document.body.style.overflow = 'hidden';
    } else {
      // モーダルを閉じた時、スクロールを有効化
      document.body.style.overflow = 'unset';
    }

    // クリーンアップ: コンポーネントがアンマウントされた時にスクロールを戻す
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // 工程の選択肢
  const phaseOptions = [
    "要件定義",
    "基本設計",
    "詳細設計",
    "実装",
    "テスト",
    "リリース",
    "保守・運用",
  ];

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Save to database - implement Supabase integration
    // Reset form and close modal
    setFormData({
      title: "",
      summary: "",
      description: "",
      startDate: "",
      endDate: "",
      roles: [],
      tags: [],
    });
    setIsCurrent(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 fade-in">
      <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-xl bg-white shadow-xl scale-in">
        <ModalHeader title="新規プロジェクト追加" onClose={onClose} />

        <NoticeInfo />

        <form onSubmit={handleSubmit} className="space-y-6 p-6">
          <ProjectBasicFields
            title={formData.title}
            summary={formData.summary}
            description={formData.description}
            onTitleChange={(value) => setFormData({ ...formData, title: value })}
            onSummaryChange={(value) => setFormData({ ...formData, summary: value })}
            onDescriptionChange={(value) => setFormData({ ...formData, description: value })}
          />

          <DateRangeFields
            startDate={formData.startDate}
            endDate={formData.endDate}
            isCurrent={isCurrent}
            onStartDateChange={(value) => setFormData({ ...formData, startDate: value })}
            onEndDateChange={(value) => setFormData({ ...formData, endDate: value })}
            onCurrentChange={(checked) => {
              setIsCurrent(checked);
              if (checked) {
                setFormData({ ...formData, endDate: "" });
              }
            }}
          />

          <PhaseSelector
            selectedPhases={formData.roles}
            availablePhases={phaseOptions}
            onAddPhase={handleAddPhase}
            onRemovePhase={handleRemovePhase}
          />

          <TagSelector
            selectedTags={formData.tags}
            availableTags={availableTags}
            onToggleTag={handleToggleTag}
            onRemoveTag={handleRemoveTag}
          />

          <FormActions onCancel={onClose} />
        </form>
      </div>
    </div>
  );
}
