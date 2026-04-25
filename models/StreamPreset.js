const { v4: uuidv4 } = require('uuid');
const { db } = require('../db/database');

class StreamPreset {
  /**
   * Create a new stream preset.
   */
  static create(data) {
    const id = uuidv4();
    const {
      user_id,
      name,
      platform = '',
      platform_icon = '',
      rtmp_url = '',
      stream_key = '',
      bitrate = 2500,
      resolution = '1280x720',
      fps = 30,
      orientation = 'horizontal',
      use_advanced_settings = false,
    } = data;

    const use_advanced_int = use_advanced_settings ? 1 : 0;

    return new Promise((resolve, reject) => {
      db.run(
        `INSERT INTO stream_presets
          (id, user_id, name, platform, platform_icon, rtmp_url, stream_key,
           bitrate, resolution, fps, orientation, use_advanced_settings)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [id, user_id, name, platform, platform_icon, rtmp_url, stream_key,
         bitrate, resolution, fps, orientation, use_advanced_int],
        function (err) {
          if (err) {
            console.error('Error creating stream preset:', err.message);
            return reject(err);
          }
          resolve({ id, ...data, use_advanced_settings: !!use_advanced_settings });
        }
      );
    });
  }

  /**
   * Find all presets for a user.
   */
  static findByUser(userId) {
    return new Promise((resolve, reject) => {
      db.all(
        `SELECT * FROM stream_presets WHERE user_id = ? ORDER BY created_at DESC`,
        [userId],
        (err, rows) => {
          if (err) {
            console.error('Error finding stream presets:', err.message);
            return reject(err);
          }
          if (rows) {
            rows.forEach(row => {
              row.use_advanced_settings = row.use_advanced_settings === 1;
            });
          }
          resolve(rows || []);
        }
      );
    });
  }

  /**
   * Find a single preset by ID, scoped to user.
   */
  static findById(id, userId) {
    return new Promise((resolve, reject) => {
      db.get(
        `SELECT * FROM stream_presets WHERE id = ? AND user_id = ?`,
        [id, userId],
        (err, row) => {
          if (err) {
            console.error('Error finding stream preset:', err.message);
            return reject(err);
          }
          if (row) {
            row.use_advanced_settings = row.use_advanced_settings === 1;
          }
          resolve(row);
        }
      );
    });
  }

  /**
   * Update a preset.
   */
  static update(id, userId, data) {
    const fields = [];
    const values = [];

    const allowed = ['name', 'platform', 'platform_icon', 'rtmp_url', 'stream_key',
                     'bitrate', 'resolution', 'fps', 'orientation', 'use_advanced_settings'];

    allowed.forEach(key => {
      if (data[key] !== undefined) {
        if (key === 'use_advanced_settings') {
          fields.push(`${key} = ?`);
          values.push(data[key] ? 1 : 0);
        } else {
          fields.push(`${key} = ?`);
          values.push(data[key]);
        }
      }
    });

    if (fields.length === 0) {
      return Promise.resolve({ id, message: 'No fields to update' });
    }

    fields.push('updated_at = CURRENT_TIMESTAMP');
    values.push(id, userId);

    return new Promise((resolve, reject) => {
      db.run(
        `UPDATE stream_presets SET ${fields.join(', ')} WHERE id = ? AND user_id = ?`,
        values,
        function (err) {
          if (err) {
            console.error('Error updating stream preset:', err.message);
            return reject(err);
          }
          resolve({ id, updated: this.changes > 0 });
        }
      );
    });
  }

  /**
   * Delete a preset.
   */
  static delete(id, userId) {
    return new Promise((resolve, reject) => {
      db.run(
        `DELETE FROM stream_presets WHERE id = ? AND user_id = ?`,
        [id, userId],
        function (err) {
          if (err) {
            console.error('Error deleting stream preset:', err.message);
            return reject(err);
          }
          resolve({ success: true, deleted: this.changes > 0 });
        }
      );
    });
  }
}

module.exports = StreamPreset;
